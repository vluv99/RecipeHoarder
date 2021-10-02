import { Injectable } from '@angular/core';
//import {recipes} from "../../scraper/mock_data";
import {AngularFirestore} from "@angular/fire/firestore";
import {Recipe} from "../../../shared/model/Recipe";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //recipe?: Recipe[];

  constructor(private store: AngularFirestore) {
    //this.local_db = []//recipes;
  }

  async search(input:string):Promise<Recipe[]> {
    //input = input.toLowerCase();

    const data = await this.store.collection("recipes").ref
      .where('name', '>=', input)
      .where('name', '<=', input+ '\uf8ff')
      .withConverter(recipeConverter).get()

    let recipes = data.docs.map(da =>
    {
      return da.data();
    })

    return recipes

    /*let result:Recipe[] = [];
    input = input.toLowerCase();

    this.local_db.forEach(function (r) {
      var name = r.name.toLowerCase();
      if (name.includes(input)){
        //console.log(name)
        result.push(r);
      }
    })
*/
    //return [];
  }

  async getRecipeById(input: string): Promise<Recipe> {
    var data = await this.store.collection("recipes").doc(input).ref.withConverter(recipeConverter).get();

    // @ts-ignore
    return data.data();
  }

  async getRecommendedRecipes(): Promise<Recipe[]> {
    var datas = await this.store.collection("recipes").ref.limit(8).withConverter(recipeConverter).get();

    var res:Recipe[] = [];
    datas.forEach((d) =>{
      res.push(d.data());
    })

    return res;
  }

  async upload(r: Recipe) {
    const doc = await this.store.collection("recipes").add(recipeConverter.toFirestore(r));
    return doc.id
  }
}

// Firestore data converter
/*const recipeConverter = {

  toFirestore: function(recipe:Recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      url: recipe.url,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image: recipe.image,
      calories: recipe.calories
    };
  },

  fromFirestore: function(snapshot:any, options:any){
    const data = snapshot.data(options);
    return new Recipe(snapshot.id,
                      data.name,
                      data.url,
                      data.description,
                      data.ingredients,
                      data.steps,
                      data.image,
                      data.calories);
  }
};*/

const recipeConverter = {

  toFirestore: function(recipe:Recipe) {
    return Object.assign({},recipe);
  },

  fromFirestore: function(snapshot:any, options:any) {
    const data = snapshot.data(options);
    return Object.assign(Recipe.empty(), data);
  }
};

