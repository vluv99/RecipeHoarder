import {Component, OnInit} from '@angular/core';
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [
    new Ingredient("chicken breast", 1.5, Measurement.KG),
    new Ingredient("flour", 2, Measurement.KG),
    new Ingredient("bakin poweder", 15, Measurement.G),
  ]

  constructor() { }

  ngOnInit(): void {
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
