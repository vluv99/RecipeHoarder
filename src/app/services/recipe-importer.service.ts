import { Injectable } from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {Recipe} from "../../../shared/model/Recipe";


@Injectable({
  providedIn: 'root'
})
export class RecipeImporterService {

  recipe?:Recipe;

  constructor(private fns: AngularFireFunctions) { }

  async getRecipe(url:string){
    const callable = this.fns.httpsCallable('importRecipe');
    const recipeString = await callable({ url: url }).toPromise() ;

    //console.log(recipe)

    this.recipe = JSON.parse(recipeString)

    Object.setPrototypeOf(this.recipe, Recipe.prototype)
    console.log(this.recipe);
  }
}
