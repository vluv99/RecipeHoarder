import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatabaseService} from "../services/database-service";
import {Recipe} from "../../../shared/model/Recipe";
//import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ReportRecipeListComponent} from "./report-recipe-list/report-recipe-list.component";
import {AuthService} from "../services/auth-service";
import {val} from "cheerio/lib/api/attributes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Ingredient} from "../../../shared/model/Ingredient";
import {ShoppinglistService} from "../services/shoppinglist.service";

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

    recipe!: Recipe;

    //https://www.npmjs.com/package/ngx-lightbox - use this for pop up images

    recipeId!: string;
    private sub: any;

    problems: string[] = [
        "Missing or bad quality image",
        "Missing recipe data",
        "Has wrong category",
        "Recipe has too many errors",
        "Inappropriate language",
        "Other"
    ]

    constructor(private route: ActivatedRoute,
                private database: DatabaseService,
                private authService: AuthService,
                private _snackbar: MatSnackBar,
                private shoppinglistService: ShoppinglistService /*,
              private _bottomSheet: MatBottomSheet*/) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.recipeId = params['recipeId'];

            //TODO: load search results at
            this.database.getRecipeById(this.recipeId).then((r) => {

                this.recipe = r;
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    opernReportsheet() {
        //this._bottomSheet.open(ReportRecipeListComponent);
        //this._bottomSheet
    }

    report: string = "";

    reportProblem() {
        if (this.report != "") {
            let res = this.database.reportRecipe(this.recipeId, this.authService.userData.uid, this.report)

            res.then(() => {
                this._snackbar.open("Thank you for your report!", 'Close!', {
                    duration: 3000
                });
            }).catch(() => {
                this._snackbar.open("Report failed, try again next time!", 'Close!', {
                    duration: 3000
                });
            })
            if (!res) {

            } /*else {

            }*/
        }
    }

    changeReportOptions(value: string) {
        this.report = value;
    }

    addAlltoShoppinglist(ingredients: Ingredient[]) {
        this.shoppinglistService.addAllIngredients(ingredients)
        //TODO: return promise, i have no idea how to do that after the forEach... :/
    }
}
