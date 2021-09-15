import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient-fields',
  templateUrl: './ingredient-fields.component.html',
  styleUrls: ['./ingredient-fields.component.scss']
})
export class IngredientFieldsComponent implements OnInit {

  id?: any;
  measures:String[] = ["kg", "dkg", "gr"];

  ingredientNamesList = [
    "flour", "cucumber", "distilled white vinegar", "garlic","extra-virgin olive oil", "lemon", "dried oregano", "tomato", "chicken breast", "bakin poweder"
  ]

  constructor() { }

  ngOnInit(): void {
    let hints = document.getElementsByClassName("hint")

    // @ts-ignore
    for (let i = 0; i < hints.length; i++) {
      // @ts-ignore
      hints[i].hidden = true;
    }
  }

  onFocusEvent($event: any, id:string, num:string) {
  /* let element = document.getElementById("hint"+num);

    // @ts-ignore
    element.hidden = false;

    if (id == 'amount'+num){
      // @ts-ignore
      element.innerHTML = "Amount of the ingredient"
    } else if(id == 'measure'+num){
      // @ts-ignore
      element.innerHTML = "Measurement type of the ingredient"
    } else if(id == 'name'+num){
      // @ts-ignore
      element.innerHTML = "Name of the ingredient"
    }*/
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