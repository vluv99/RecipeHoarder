import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'app-shopping-list-input',
    templateUrl: './shopping-list-input.component.html',
    styleUrls: ['./shopping-list-input.component.scss']
})
export class ShoppingListInputComponent implements OnInit, ControlValueAccessor  {
    //measures:String[] = ["kg", "dkg", "gr"];

    ingredientNamesList = [
        "flour", "cucumber", "distilled white vinegar", "garlic", "extra-virgin olive oil", "lemon", "dried oregano", "tomato", "chicken breast", "bakin poweder"
    ]

    @Input() ing: Ingredient = new Ingredient("", 0, "");
    @Output() add = new EventEmitter<Ingredient>()

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

    onChange = (ing:Ingredient) => {};

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

    add2() {
        // @ts-ignore
        document.getElementById("hint").hidden = true;

        if (this.ing.name != ""){
            this.shoppinglistService.addIngredientToShoppinglist(this.ing).then(() => {
                //alert("success")
            }).catch(() => {
                alert("wasnt success!")
            })
        }

        //addToIngredient(new Ingredient(name, amount, measure))
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}
