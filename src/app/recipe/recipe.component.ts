import {Component, OnDestroy, OnInit} from '@angular/core';
import { getData } from 'src/scraper/core';
import {Recipe} from "../../model/Recipe";
import {Ingredient} from "../../model/Ingredient";
import {Steps} from "../../model/Steps";
import {ActivatedRoute} from "@angular/router";
import {DatabaseServiceService} from "../services/database-service.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  recipe!: Recipe ;

  recipeId!: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private database:DatabaseServiceService) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.recipeId = params['recipeId'];

    //TODO: load search results at
      this.recipe = this.database.getById(this.recipeId);
  });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
