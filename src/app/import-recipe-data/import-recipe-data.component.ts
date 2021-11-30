import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../../shared/model/Recipe";
import {Ingredient} from "../../../shared/model/Ingredient";
import {RecipeImporterService} from "../services/recipe-importer.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database-service";
import {Steps} from "../../../shared/model/Steps";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-import-recipe-data',
    templateUrl: './import-recipe-data.component.html',
    styleUrls: ['./import-recipe-data.component.scss']
})
export class ImportRecipeDataComponent implements OnInit {

    r: Recipe = new Recipe("", "")
    image: any;
    stepCount: number = 0;

    constructor(private recipeImporter: RecipeImporterService, private _router: Router,
                private database: DatabaseService,
                private _snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        if (this.recipeImporter.recipe) {
            this.r = this.recipeImporter.recipe!; //TODO: check this
            this.stepCount = this.r.steps.length
        } else {
            this.r = Recipe.empty();
            this.stepCount = 0
        }
    }


    saveRecipe() {
        this.r.importDate = new Date();

        if (this.r.steps.length == 0 || this.r.ingredients.length == 0 || this.r.name == "") {
            this._snackbar.open('You have to upload a full recipe!', 'Got it!', {
                duration: 5000
            });

        } else {
            if (this.r.categories.length != 0) {

                this.checkForEmptyStep();
                this.checkForEmptyIngredient();

                //recheck ing and steps after refreshing them
                if (this.r.steps.length == 0 || this.r.ingredients.length == 0) {
                    this._snackbar.open('You have to upload a full recipe!', 'Got it!', {
                        duration: 5000
                    });

                } else {
                    this.database.upload(this.r).then(id => {
                        this.recipeImporter.recipe = undefined;
                        this._router.navigate(['/recipe/', id])
                    });

                }

            } else {
                this._snackbar.open('Choose min. 1 category!', 'Got it!', {
                    duration: 3000
                });
            }
        }
    }

    checkForEmptyStep() {
        let newList: Steps[] = []
        // remove empty lines
        for (let i = 0; i < this.r.steps.length; i++) {
            if (this.r.steps[i].step != "" || this.r.steps[i].step != undefined) {
                newList.push(this.r.steps[i])
            }
        }
        this.r.steps = newList;

        //resets numbers
        for (let i = 0; i < this.r.steps.length; i++) {
            this.r.steps[i].number = i + 1;
        }
    }

    checkForEmptyIngredient() {
        // remove empty lines (empty when there is no name)
        for (let i = 0; i < this.r.ingredients.length; i++) {
            if (this.r.ingredients[i].name == "") {
                delete this.r.ingredients[i]
                this.removeIngredient(this.r.ingredients[i])
            }
        }
    }

    /**
     * adding new fields and removing from the import-data form
     */
    addNewIngredient() {
        this.r.ingredients.push(new Ingredient("", 0, ""))
    }

    removeIngredient(rem: Ingredient) {
        this.r.ingredients = this.r.ingredients.filter(function (obj) {
            return obj !== rem;
        });
    }

    addNewStep() {
        //this.stepCount++
        this.r.steps.push(new Steps(this.r.steps.length+1, ""))
    }

    removeStep(rem: Steps) {
        //this.stepCount--
        this.r.steps = this.r.steps.filter(function (obj) {
            return obj !== rem
        });
    }

}
