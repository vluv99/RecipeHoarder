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
        this.ingredients = this.shoppinglistService.getShoppinglist()
        console.log(this.ingredients)

        this.suggestions = this.shoppinglistService.getShoppinglistSuggestion(3)
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


    declinedSuggestion(i: Ingredient) {
        this.suggestions = this.suggestions.filter(e => e.name != i.name)
        this.shoppinglistService.addShoppinglistSuggestionScore(-1, i.name)
    }

    acceptedSuggestion(i: Ingredient) {
        this.suggestions = this.suggestions.filter(e => e.name != i.name)
        this.input.setValue(new Ingredient(i.name,0,''));
        this.shoppinglistService.addShoppinglistSuggestionScore(1, i.name)

    }
}
