import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../model/Recipe";
import {recipes} from "../../../scraper/mock_data"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[];

  constructor() {
    this.recipes = recipes;
  }

  ngOnInit(): void {
  }

}
