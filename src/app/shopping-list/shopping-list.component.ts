import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/model/Ingredient";
import {ShoppinglistService} from "../services/shoppinglist.service";
import {AuthService} from "../services/auth-service";
import {ShoppingListInputComponent} from "./shopping-list-input/shopping-list-input.component";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[] = []
    suggestions: Ingredient[] = []

    @ViewChild(ShoppingListInputComponent)
    input!: ShoppingListInputComponent

    constructor(
        private shoppinglistService: ShoppinglistService) {
    }

    ngOnInit(): void {
        this.shoppinglistService.getShoppinglist().then((a) => {
            this.ingredients = a;
        })
        console.log(this.ingredients)

        this.suggestions = this.shoppinglistService.getShoppinglistSuggestion(3)
    }

    removeIngredient(rem: Ingredient) {
        this.shoppinglistService.removeShoppinglistItem(rem.id).then(() => {
            this.shoppinglistService.getShoppinglist().then((a) => {
                this.ingredients = a;
            })
        })
    }

    addIngredient(i: Ingredient) {
        if(i.name == ""){
            return;
        }
        this.shoppinglistService.addIngredientToShoppinglist(i).then(() => {
            this.shoppinglistService.getShoppinglist().then((a) => {
                this.ingredients = a;
            })
        })
    }

    removeAllIngedients() {
        this.shoppinglistService.removeAllIngedients().then(() => {
            this.shoppinglistService.getShoppinglist().then((a) => {
                this.ingredients = a;
            })
        })
    }


    declinedSuggestion(i: Ingredient) {
        this.suggestions = this.suggestions.filter(e => e.name != i.name)
        this.shoppinglistService.addShoppinglistSuggestionScore(-1, i.name, true)
    }

    acceptedSuggestion(i: Ingredient) {
        this.suggestions = this.suggestions.filter(e => e.name != i.name)
        this.input.setValue(new Ingredient(i.name,0,''));
        this.shoppinglistService.addShoppinglistSuggestionScore(1, i.name)

    }
}
