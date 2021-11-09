import {Component, OnInit, ViewChild} from '@angular/core';
import { Input } from "@angular/core";
import {Ingredient} from "../../../../shared/model/Ingredient";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent implements OnInit {
  @Input() ingredient!: Ingredient;

  constructor(private shoppinglistService: ShoppinglistService,
              private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

    add(ingredient: Ingredient) {
        this.shoppinglistService.addIngredientToShoppinglist(ingredient).then(() => {
            /*@ViewChild("mat-icon") //change icon once its added
            set icon(){
                contex: "add_circle"
            }*/

            this._snackbar.open('Added item to shopping list!', 'Got it!', {
                duration: 2000
            });
        })
    }
}
