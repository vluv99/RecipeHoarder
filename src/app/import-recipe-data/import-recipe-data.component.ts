import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";
import {RecipeImporterService} from "../services/recipe-importer.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database-service";
import {Steps} from "../../../shared/model/Steps";

@Component({
  selector: 'app-import-recipe-data',
  templateUrl: './import-recipe-data.component.html',
  styleUrls: ['./import-recipe-data.component.scss']
})
export class ImportRecipeDataComponent implements OnInit {

  r:Recipe = new Recipe("", "")
  image: any;
  stepCount:number = 0;

  constructor(private recipeImporter:RecipeImporterService, private _router: Router,
              private database:DatabaseService) { }

  ngOnInit(): void {
    if(this.recipeImporter.recipe) {
      this.r = this.recipeImporter.recipe!; //TODO: check this
      this.stepCount = this.r.steps.length
    }else {
      this.r = Recipe.empty()
      //this.r.categories.push("Dinner")
      this.stepCount = 0
    }
  }



  saveRecipe(){
    this.r.importDate = new Date();

    this.database.upload(this.r).then(id => {
      this._router.navigate(['/recipe/' , id])
    })
  }

  addNewIngredient() {
    this.r.ingredients.push(new Ingredient("",0,Measurement.KG))
  }

  removeIngredient(rem: Ingredient) {
    this.r.ingredients = this.r.ingredients.filter(function( obj ) {
      return obj !== rem;
    });
  }

  addNewStep() {
    this.stepCount++
    this.r.steps.push(new Steps(this.stepCount, ""))
  }

  removeStep(rem: Steps) {
    this.stepCount--
    this.r.steps = this.r.steps.filter(function (obj) {
      return obj !== rem
    });
  }

}
