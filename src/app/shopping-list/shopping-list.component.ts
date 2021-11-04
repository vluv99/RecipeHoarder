import {Component, OnInit} from '@angular/core';
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";
import {ShoppinglistService} from "../services/shoppinglist.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = []

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
      this.ingredients = this.shoppinglistService.getShoppinglist()

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

}
