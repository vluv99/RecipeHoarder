import {Ingredient} from "./Ingredient";
import {Steps} from "./Steps";

export class Recipe {
  id?: String;
  name: String;
  image: URL | null = null;
  url: String = "";
  calories: number = 0;
  totalCookTime: any = null;
  description: string = "";
  ingredients: Ingredient[] = [];
  steps: Steps[] = [];

  /*constructor(id:String, name:String, image:URL, url:String, description:String, ingredients:Ingredient[], steps:Steps[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.url = url;
    this.calories = 0;
    this.totalCookTime = 0;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
  }*/
  constructor(id:String, name:String) {
    this.id = id;
    this.name = name;
  }

}
