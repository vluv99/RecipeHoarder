import {Ingredient} from "./Ingredient";
import {Steps} from "./Steps";

export class Recipe {
  id?: String;
  name: String;
  url: String;
  description: String;
  ingredients: Ingredient[];
  steps: Steps[];

  constructor(id:String, name:String, url:String, description:String, ingredients:Ingredient[], steps:Steps[]) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
  }


}
