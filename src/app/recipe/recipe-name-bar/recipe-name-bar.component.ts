import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/Recipe";

@Component({
  selector: 'app-recipe-name-bar',
  templateUrl: './recipe-name-bar.component.html',
  styleUrls: ['./recipe-name-bar.component.scss']
})
export class RecipeNameBarComponent implements OnInit {
  @Input() recipe!: Recipe

  constructor() {  }

  ngOnInit(): void {
  }

}
