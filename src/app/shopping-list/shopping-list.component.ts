import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../shared/model/Ingredient";
import {ShoppinglistService} from "../services/shoppinglist.service";
import {AuthService} from "../services/auth-service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[] = []

    constructor(
        private shoppinglistService: ShoppinglistService) {
    }

    ngOnInit(): void {
        this.ingredients = this.shoppinglistService.getShoppinglist()
        console.log(this.ingredients)

        //let snackBarRef = snackBar.open('Message archived', 'Undo'); TODO: figure out why wouldn't it notice the snackbar import

        /*setTimeout(() => {
          openSnackBar(message: string, action: string) {
            this.snackBar.open(message, action, {
              duration: 2000,
              // here specify the position
              verticalPosition: 'top'
            });
          }
        }, 1000)
      }*/

        /*
          addToList(i:Ingredient){
            this.ingredients.push(i);
          }*/
    }

    removeIngredient(rem: Ingredient) {
        this.shoppinglistService.removeShoppinglistItem(rem.id).then(() => {
            this.ingredients = this.shoppinglistService.getShoppinglist()
        })
    }

    addIngredient(i: Ingredient) {
        this.shoppinglistService.addIngredientToShoppinglist(i).then(() => {
            this.ingredients = this.shoppinglistService.getShoppinglist()
        })
    }

    removeAllIngedients() {
        this.shoppinglistService.removeAllIngedients().then(() => {
            this.ingredients = this.shoppinglistService.getShoppinglist()
        })
    }
}
