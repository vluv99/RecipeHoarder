import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";
import {Steps} from "../../../shared/model/Steps";
import {RecipeImporterService} from "../services/recipe-importer.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database-service";

@Component({
  selector: 'app-import-recipe-data',
  templateUrl: './import-recipe-data.component.html',
  styleUrls: ['./import-recipe-data.component.scss']
})
export class ImportRecipeDataComponent implements OnInit {

  r:Recipe = new Recipe("", "")
  image: any;

  constructor(private recipeImporter:RecipeImporterService, private _router: Router,
              private database:DatabaseService) { }

  ngOnInit(): void {
    this.r = this.recipeImporter.recipe!; //TODO: check this

    /* TODO: check if previous page was the importer, navigate back if import unsuccessfull
    if (!this.recipeImporter.recipe &&){
      this._router.navigate(['/import'])
    }*/
  }

  saveRecipe(){
    this.database.upload(this.r).then(id => {
      this._router.navigate(['/recipe/' , id])
    })
  }

}
