import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";
import {ControlValueAccessor} from "@angular/forms";

//const convert = require('convert-units')
//import convert, { volume, mass, length } from 'convert-units';



@Component({
  selector: 'app-ingredient-fields',
  templateUrl: './ingredient-field.component.html',
  styleUrls: ['./ingredient-field.component.scss']
})
export class IngredientFieldComponent implements OnInit, ControlValueAccessor {

  @Input() ing!: Ingredient;
  @Output() remove = new EventEmitter<Ingredient>();

  measures: String[] = /*this.getUnits() */[

  'mcg',   'mg',  'g',   'kg',    'mt',

  'oz',    'lb',  'tmm', 'cm',    'm',

  'km',    'in',  'yd',  'ft-us', 'ft',

  'mimm3', 'cm3', 'ml',  'cl',    'dl',

  'l',     'kl',  'm3',  'km3',   'krm',

  'tsk',   'msk', 'kkp', 'glas',  'kanna',

  'tsp',   'Tbs', 'in3', 'fl-oz', 'cup',

  'pnt',   'qt',  'gal', 'ft3',   'yd3db',

  'tbsp', 'db'

]

  ingredientNamesList = [
    "flour",
    "cucumber",
    "distilled white vinegar",
    "garlic",
    "extra-virgin olive oil",
    "lemon",
    "dried oregano",
    "tomato",
    "chicken breast",
    "bakin poweder"
  ]

  onChange = (ing:Ingredient) => {};

  constructor() {
  }

  ngOnInit(): void {
  }

  onFocusa(event: any) {
    console.log(event);
  }

  onFocusEvent(event: any, id: string, num: string) {
    /*
    let element = document.getElementById("hint"+num);

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



  dataChanged(event: any) {
    console.log(event);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
/*
  getUnits() {

    let measuresArray = convert().possibilities('mass');
    measuresArray += convert().possibilities('length');
    measuresArray += convert().possibilities('volume');
    measuresArray += "db,tbsp"

    return measuresArray.split(',')
  }*/

}
