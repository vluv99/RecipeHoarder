import {Ingredient} from "./Ingredient";
import {Steps} from "./Steps";

export class Recipe {
  name: String;
  url: String;
  description: String;
  ingredients: Ingredient[];
  steps: Steps[];

  constructor(name:String, url:String, description:String, ingredients:Ingredient[], steps:Steps[]) {
    this.name = name;
    this.url = url;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
