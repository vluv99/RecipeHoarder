import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";
import {Steps} from "../../../shared/model/Steps";

@Component({
  selector: 'app-import-recipe-data',
  templateUrl: './import-recipe-data.component.html',
  styleUrls: ['./import-recipe-data.component.scss']
})
export class ImportRecipeDataComponent implements OnInit {

  r:Recipe = this.getRecipeById("id");
  image: any;

  constructor() { }

  ngOnInit(): void {
  }

  getRecipeById(id:String){
    let r = new Recipe("id","demo recipe");
    let i = [
      new Ingredient("egg", 3, Measurement.DKG),
      new Ingredient("egg2", 55, Measurement.DKG),
      new Ingredient("egg3", 2, Measurement.KG),
      new Ingredient("egg4", 611, Measurement.G)];
    let d = [new Steps(1, "sjkdfsd"),
      new Steps(2, "sjkdfsd"),
      new Steps(3, "df"),
      new Steps(4, "sdfsdfsd"),
      new Steps(5, "sjkdfsd"),
      new Steps(6, "sdfsd"),
      new Steps(7, "sjkdfsd")]

    r.image = null;
    this.image = "./assets/img/pizza-pizza-filled-with-tomatoes-salami-olives.jpg"

    r.description = "desc";
    r.ingredients = i;
    r.steps = d;

    return r;
  }
}
