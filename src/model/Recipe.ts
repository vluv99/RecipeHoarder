import {Ingredient} from "./Ingredient";

export class Recipe {
  name: String;
  description: String;
  ingredients: Ingredient[];

  constructor(name:String, description:String, ingredients:Ingredient[]) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
  }
}
