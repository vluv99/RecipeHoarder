import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../../shared/model/Recipe";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe! : Recipe;

  constructor() {
  }

  ngOnInit(): void {
    //console.log(this.recipe);
  }



}
