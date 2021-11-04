import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";
import {ShoppinglistService} from "../../services/shoppinglist.service";

@Component({
    selector: 'app-shopping-list-input',
    templateUrl: './shopping-list-input.component.html',
    styleUrls: ['./shopping-list-input.component.scss']
})
export class ShoppingListInputComponent implements OnInit {
    //measures:String[] = ["kg", "dkg", "gr"];

    ingredientNamesList = [
        "flour", "cucumber", "distilled white vinegar", "garlic", "extra-virgin olive oil", "lemon", "dried oregano", "tomato", "chicken breast", "bakin poweder"
    ]

    @Input() ing: Ingredient = new Ingredient("", 0, "");

    measures: String[] = /*this.getUnits() */[

        'mcg', 'mg', 'g', 'kg', 'mt',

        'oz', 'lb', 'tmm', 'cm', 'm',

        'km', 'in', 'yd', 'ft-us', 'ft',

        'mimm3', 'cm3', 'ml', 'cl', 'dl',

        'l', 'kl', 'm3', 'km3', 'krm',

        'tsk', 'msk', 'kkp', 'glas', 'kanna',

        'tsp', 'Tbs', 'in3', 'fl-oz', 'cup',

        'pnt', 'qt', 'gal', 'ft3', 'yd3db',

        'tbsp'/*, 'piece', 'pieces'*/, 'tbsp'

    ]

    constructor(private shoppinglistService: ShoppinglistService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        document.getElementById("hint").hidden = true;
    }

    onFocusEvent($event: any, id: string) {
        let element = document.getElementById("hint");

        // @ts-ignore
        element.hidden = false;

        if (id == 'amount') {
            // @ts-ignore
            element.innerHTML = "Amount of the ingredient"
        } else if (id == 'measure') {
            // @ts-ignore
            element.innerHTML = "Measurement type of the ingredient"
        } else if (id == 'name') {
            // @ts-ignore
            element.innerHTML = "Name of the ingredient"
        }
    }

    add() {
        // @ts-ignore
        document.getElementById("hint").hidden = true;

        if (this.ing.name != ""){
            this.shoppinglistService.addIngredientToShoppinglist(this.ing).then(() => {
                //alert("success")
                this.shoppinglistService.getShoppinglist()
            }).catch(() => {
                alert("wasnt success!")
            })
        }

        //addToIngredient(new Ingredient(name, amount, measure))
    }
}
