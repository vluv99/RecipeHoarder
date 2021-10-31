import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth-service";
import {DatabaseService, recipeConverter} from "./database-service";
import {Recipe} from "../../../shared/model/Recipe";


@Injectable({
    providedIn: 'root'
})
export class UserDatabaseService {

    constructor(private store: AngularFirestore,
                private authService: AuthService,
                private databaseService:DatabaseService) {

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

    async checkIfRecipeInCollection(type: string | SubcollectionName, recipeId: string) :Promise<boolean>{
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type)
        //let result: Promise<boolean> = new Promise<boolean>()

        const querry = collection.ref.where("recipeId", "==", recipeId).get();
        let res = await querry;

        if (res.empty) {
            return false;
        }
        return true;
    }

    async deleteFromCollection(type: string | SubcollectionName, recipeId: string){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type)

        const querry = collection.ref.where("recipeId", "==", recipeId).limit(1).get();
        let res = await querry;

        return collection.doc(res.docs[0].id).delete()
    }

    getRecipesInCollection(type: string | SubcollectionName){
        const collection = this.store.collection('users/' + this.authService.userData.uid + "/" + type).ref.get()

        let res:Recipe[] = []
        collection.then((qs) => {
            qs.forEach((s) => {
                let recipeRef:any = s.data();
                this.databaseService.getRecipeById(recipeRef.recipeId).then((r) => {
                   res.push(r)
                })
            })
        })

        return res;
    }

}

export enum SubcollectionName {
    base = "base",
    favourites = "favourites"
}
