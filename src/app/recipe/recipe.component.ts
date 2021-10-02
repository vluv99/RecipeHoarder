import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../model/Recipe";
import {Ingredient} from "../../model/Ingredient";
import {Steps} from "../../model/Steps";
import {ActivatedRoute} from "@angular/router";
import {DatabaseService} from "../services/database-service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  recipe!: Recipe ;

  recipeId!: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private database:DatabaseService) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.recipeId = params['recipeId'];

    //TODO: load search results at
    this.database.getRecipeById(this.recipeId).then((r)=>{

      this.recipe = r;
    });
  });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
