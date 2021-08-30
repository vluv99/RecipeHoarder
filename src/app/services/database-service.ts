import { Injectable } from '@angular/core';
import {Recipe} from "../../model/Recipe";
import {recipes} from "../../scraper/mock_data";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: Recipe[];

  constructor(private store: AngularFirestore) {
    this.db = recipes;
  }

  search(input:string):Recipe[]{
    let result:Recipe[] = [];
    input = input.toLowerCase();

    this.db.forEach(function (r) {
      var name = r.name.toLowerCase();
      if (name.includes(input)){
        //console.log(name)
        result.push(r);
      }
    })

    return result;
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
}

// Firestore data converter
const recipeConverter = {

  toFirestore: function(recipe:Recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      url: recipe.url,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps
    };
  },

  fromFirestore: function(snapshot:any, options:any){
    const data = snapshot.data(options);
    return new Recipe(snapshot.id, data.name, data.url, data.description, data.ingredients, data.steps);
  }
};

