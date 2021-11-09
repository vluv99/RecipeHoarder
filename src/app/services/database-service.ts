import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Recipe} from "../../../shared/model/Recipe";
import {deepCopy} from "../../../shared/util/DeepCopy";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {


    constructor(private store: AngularFirestore) {

    }

    async search(input: string): Promise<Recipe[]> {

        const data = await this.store.collection("recipes").ref
            .where('name', '>=', input)
            .where('name', '<=', input + '\uf8ff')
            .withConverter(recipeConverter).get()

        let recipes = data.docs.map(da => {
            return da.data();
        })

        return recipes;
    }

    async getRecipeById(input: string): Promise<Recipe> {
        var data = await this.store.collection("recipes").doc(input).ref.withConverter(recipeConverter).get();

        // @ts-ignore
        return data.data();
    }

    async getRecommendedRecipes(): Promise<Recipe[]> {
        var datas = await this.store.collection("recipes").ref.limit(8).withConverter(recipeConverter).get();

        var res: Recipe[] = [];
        datas.forEach((d) => {
            res.push(d.data());
        })

        return res;
    }

    async getRecipesByCategory(cat: string): Promise<Recipe[]> {
        var datas = await this.store.collection("recipes").ref.withConverter(recipeConverter).get();

        var res: Recipe[] = [];
        datas.forEach((d) => {
            if (d.get("categories").includes(cat)) {
                res.push(d.data());
            }
        })

        return res;
    }

    async upload(r: Recipe) {
        const doc = await this.store.collection("recipes").add(recipeConverter.toFirestore(r));
        return doc.id
    }

    async reportRecipe(recipeId: string, userId: string, problem: string):Promise<boolean> {

        await this.store.collection("reports").add(
            {recipeId: recipeId, userId: userId, problem: problem, creationDate: new Date()}
        ).then(() => {
            return true;
        })

        return false;
    }
}

export const recipeConverter = {

    toFirestore: function (recipe: Recipe) {
        //return Object.assign({},recipe);
        let a = deepCopy(recipe);

        return a;
    },

    fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        data.id = snapshot.id
        return Object.assign(Recipe.empty(), data);
    }
};

