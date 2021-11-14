import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, ControlValueAccessor {

    IngredientType = IngredientType;

    @Input() ingredient!: Ingredient;
    @Output() remove = new EventEmitter<Ingredient>()
    @Output() accept = new EventEmitter<Ingredient>()

    @Input() type: IngredientType = IngredientType.ShoppingList;

    onChange = (ingredient:Ingredient) => {};

    constructor(private shoppinglistService: ShoppinglistService) {
    }

    ngOnInit(): void {
    }

    /*removeButtonClicked() {
        this.shoppinglistService.removeShoppinglistItem(this.ingredient.id)
    }*/

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}

export enum IngredientType{
    ShoppingList,
    Suggestion
}
