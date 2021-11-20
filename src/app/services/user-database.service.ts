import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth-service";
import {DatabaseService, recipeConverter} from "./database-service";
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient} from "../../../shared/model/Ingredient";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";
import firebase from "firebase/compat/app";

import Qty from 'js-quantities';

//const convert = require('convert-units')

@Injectable({
    providedIn: 'root'
})
export class UserDatabaseService {
    units: string[]

    constructor(private store: AngularFirestore,
                private authService: AuthService,
                private databaseService: DatabaseService) {
        this.units = this.getUnits();
    }

    addToCollection(type: string | SubcollectionName, recipeId: string) {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type)

        return collection.ref.where("recipeId", "==", recipeId)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    collection.add({
                        recipeId,
                        addDate: new Date()
                    })
                }
            })
    }

    async checkIfRecipeInCollection(type: string | SubcollectionName, recipeId: string): Promise<boolean> {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type)
        //let result: Promise<boolean> = new Promise<boolean>()

        const querry = collection.ref.where("recipeId", "==", recipeId).get();
        let res = await querry;

        if (res.empty) {
            return false;
        }
        return true;
    }

    async deleteFromCollection(type: string | SubcollectionName, recipeId: string) {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type)

        const querry = collection.ref.where("recipeId", "==", recipeId).limit(1).get();
        let res = await querry;

        return collection.doc(res.docs[0].id).delete()
    }

    getRecipesInCollection(type: string | SubcollectionName) {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type).ref.get()

        let res: Recipe[] = []
        collection.then((qs) => {
            qs.forEach((s) => {
                let recipeRef: any = s.data();
                this.databaseService.getRecipeById(recipeRef.recipeId).then((r) => {
                    res.push(r)
                })
            })
        })

        return res;
    }


    addToShoppinglist(i: Ingredient) {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist")

        return collection.ref.where("name", "==", i.name)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    collection.add(
                        {
                            "name": i.name,
                            "amount": i.amount,
                            "unit": i.measurement,
                            addDate: new Date()
                        }
                    )
                } else {
                    const converted = this.convertIngredientByUnit(i, querySnapshot.docs[0].data())

                    if (converted.measurement  == i.measurement &&
                        converted.amount == i.amount &&
                        converted.name == i.name){
                        collection.add(
                            {
                                "name": i.name,
                                "amount": i.amount,
                                "unit": i.measurement,
                                addDate: new Date()
                            }
                        )
                    }else {
                        collection.doc(querySnapshot.docs[0].id).update(
                            {
                                "name": converted.name,
                                "amount": converted.amount,
                                "unit": converted.measurement/*,
                            addDate: new Date()*/
                            }
                        )
                    }
                }
            })

    }

    removeFromShoppinglist(shoppinglistId: string){
        /*const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist").ref.get()

        collection.then((qs) => {
            qs.forEach((s) => {
                if (s.id == shoppinglistId){
                    return s.ref.delete()
                }
            })
        })*/

        const collection = this.store.collection('users').doc(this.authService.userData.uid).collection("shoppinglist")

        return collection.doc(shoppinglistId).delete()
    }

    async getIngredientsFromShoppinglist(){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist").ref
            .orderBy('addDate', 'desc')
            .get()

        let res:Ingredient[] = []
        let qs = await collection

        qs.forEach((s) => {
            let ingRef:any = s.data();
            let i = new Ingredient(ingRef.name, ingRef.amount, ingRef.unit)
            //add id, to be able to remove them
            i.id = s.id;
            res.push(i);
        })

        return res;
    }

    removeAllFromShoppinglist(){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist").ref.get()

        return collection.then((qs) => {
            qs.forEach(async (s) => {
                await s.ref.delete()
            })
        })
    }

    addAllToShoppinglist(ing: Ingredient[]){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist")

        return ing.forEach((i) => {
            collection.ref.where("name", "==", i.name)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        collection.add(
                            {
                                "name": i.name,
                                "amount": i.amount,
                                "unit": i.measurement,
                                addDate: new Date()
                            }
                        )
                    } else { 
                        const converted = this.convertIngredientByUnit(i, querySnapshot.docs[0].data())

                        if (converted.measurement  == i.measurement &&
                            converted.amount == i.amount &&
                            converted.name == i.name){
                            collection.add(
                                {
                                    "name": i.name,
                                    "amount": i.amount,
                                    "unit": i.measurement,
                                    addDate: new Date()
                                }
                            )
                        }else {
                            collection.doc(querySnapshot.docs[0].id).update(
                                {
                                    "name": converted.name,
                                    "amount": converted.amount,
                                    "unit": converted.measurement/*,
                            addDate: new Date()*/
                                }
                            )
                        }
                    }
                })
        })

    }

    convertIngredientByUnit(newIng: Ingredient, existingIng: any): Ingredient{
        let res = new Ingredient("", 0,"")
            Object.assign(res, newIng);

        if (res.measurement == existingIng.unit){
            res.amount += existingIng.amount;
        } else if (
            (existingIng.unit == "piece" || existingIng.unit == "pieces") &&
            (res.measurement == "piece" || res.measurement == "pieces")
        ){
            res.amount += existingIng.amount;
        } else if (
            this.units.includes(res.measurement) &&
            this.units.includes(existingIng.unit)
        ){
            const qty = Qty(res.amount.toString() + " " + res.measurement);
            //rounding to 2 decimals
            res.amount = Math.round((qty.to(existingIng.unit).scalar + existingIng.amount + Number.EPSILON) *100) / 100
            res.measurement = existingIng.unit
        }

        return res
    }

    getUnits(){
        let units: string[] = [];
        const cats = ["mass", "volume", "length"];

        for (const cat of cats) {
            for (const unit of Qty.getUnits(cat)) {
                units = [...units, ...Qty.getAliases(unit)];
            }
        }

        return units;
    }

    // TODO its doesnt wanna do the promise, so for now we will have repeating code :(
    /*addItem(collection: AngularFirestoreCollection<unknown>, i:Ingredient):Promise<boolean>{
        collection.ref.where("name", "==", i.name)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    collection.add(
                        {
                            "name": i.name,
                            "amount": i.amount,
                            "unit": i.measurement,
                            addDate: new Date()
                        }
                    ).then(() => {
                        return Promise<boolean> true
                    })
                } else { //TODO: add existing ingredients together
                    collection.add(
                        {
                            "name": i.name,
                            "amount": i.amount,
                            "unit": i.measurement,
                            addDate: new Date()
                        }
                    ).then(() => {
                        return true;
                    })
                }
            })
        return new Promise<boolean>(resolve)
    }*/

    getShoppinglistSuggestions(amount: number){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglistMeta").ref
            .where('nextDate', '<=',firebase.firestore.Timestamp.now()  ) //TODO:maybe later do a filter for the past too
            .orderBy('nextDate', 'desc')
            .orderBy('score','desc')
            //.where('score', '>', 0)
            .limit(amount).get()

        let res : Ingredient[] = [];
        collection.then((qs) => {
            qs.forEach((s) => {
                let ingRef:any = s.data();

                if(ingRef.score > 0) {

                    let i = new Ingredient(ingRef.name, ingRef.amount, ingRef.unit)
                    //add id, to be able to remove them
                    i.id = s.id;
                    res.push(i);
                }
            })

        })

        return res;
    }

    addShoppinglistSuggestionScore(score: number, ingName: string, modifyDate: boolean = false) {
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglistMeta").ref
            .where("name", '==', ingName)
            .limit(1)
            .get()
        collection.then(snap =>{
            if(!snap.empty){

                let data: any = snap.docs[0].data();
                if('score' in data){
                    data.score = data.score + score;
                }
                else {
                    data.score = 2 + score;
                }

                if (modifyDate){
                    data.nextDate = new firebase.firestore.Timestamp(firebase.firestore.Timestamp.now().seconds + Math.round(data.delaTime), 0)
                }

                snap.docs[0].ref.update({'score': data.score, 'nextDate': data.nextDate})

            }
        })
    }
}

export enum SubcollectionName {
    base = "base",
    favourites = "favourites"
}
