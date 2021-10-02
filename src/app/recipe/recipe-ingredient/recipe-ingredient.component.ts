import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import {Ingredient} from "../../../../shared/model/Ingredient";

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent implements OnInit {
  @Input() ingredient!: Ingredient;

  constructor() { }

  ngOnInit(): void {
  }

}
