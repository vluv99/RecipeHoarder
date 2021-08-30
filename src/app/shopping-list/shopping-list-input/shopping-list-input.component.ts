import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";

@Component({
  selector: 'app-shopping-list-input',
  templateUrl: './shopping-list-input.component.html',
  styleUrls: ['./shopping-list-input.component.scss']
})
export class ShoppingListInputComponent implements OnInit {
  measures:String[] = ["kg", "dkg", "gr"];

  ingredientNamesList = [
    "flour", "cucumber", "distilled white vinegar", "garlic","extra-virgin olive oil", "lemon", "dried oregano", "tomato", "chicken breast", "bakin poweder"
  ]

  // TODO: later use autocomplete for this (maybe): https://material.angularjs.org/latest/demo/autocomplete

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById("hint").hidden = true;

  }

  onFocusEvent($event: any, id:string) {
    let element = document.getElementById("hint");

    // @ts-ignore
    element.hidden = false;

    if (id == 'amount'){
      // @ts-ignore
      element.innerHTML = "Amount of the ingredient"
    } else if(id == 'measure'){
      // @ts-ignore
      element.innerHTML = "Measurement type of the ingredient"
    } else if(id == 'name'){
      // @ts-ignore
      element.innerHTML = "Name of the ingredient"
    }
  }

  add() {
    // @ts-ignore
    document.getElementById("hint").hidden = true;

    let amount = document.getElementById("amount-input")
    let measure = document.getElementById("measurement-input")
    let name = document.getElementById("name-input")

    //addToIngredient(new Ingredient(name, amount, measure))
  }
}
