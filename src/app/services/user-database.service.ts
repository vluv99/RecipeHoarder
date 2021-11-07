import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth-service";
import {DatabaseService, recipeConverter} from "./database-service";
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient} from "../../../shared/model/Ingredient";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";


@Injectable({
    providedIn: 'root'
})
export class UserDatabaseService {

    constructor(private store: AngularFirestore,
                private authService: AuthService,
                private databaseService: DatabaseService) {

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
                } else { //TODO: add existing ingredients together
                    collection.add(
                        {
                            "name": i.name,
                            "amount": i.amount,
                            "unit": i.measurement,
                            addDate: new Date()
                        }
                    )
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

    getIngredientsFromShoppinglist(){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/shoppinglist").ref.get()

        let res:Ingredient[] = []
        collection.then((qs) => {
            qs.forEach((s) => {
                let ingRef:any = s.data();
                let i = new Ingredient(ingRef.name, ingRef.amount, ingRef.unit)
                //add id, to be able to remove them
                i.id = s.id;
                res.push(i);
            })

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
                    } else { //TODO: add existing ingredients together
                        collection.add(
                            {
                                "name": i.name,
                                "amount": i.amount,
                                "unit": i.measurement,
                                addDate: new Date()
                            }
                        )
                    }
                })
        })

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
}

export enum SubcollectionName {
    base = "base",
    favourites = "favourites"
}
