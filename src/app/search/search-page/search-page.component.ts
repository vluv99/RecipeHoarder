import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router, RouterEvent} from "@angular/router";
import {DatabaseService} from "../../services/database-service";
import {filter} from "rxjs/operators";
import {Recipe} from "../../../../shared/model/Recipe";
import {RecipeCollectionsService} from "../../services/recipe-collections.service";
import {SubcollectionName} from "../../services/user-database.service";

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {

    recipes!: Recipe[];
    searchTerm!: string;
    private sub: any;

    url: String | undefined;
    title?: HTMLElement | null = document.getElementById(`title`)
    text?: HTMLElement | null = document.getElementById(`text`)


    constructor(private route: ActivatedRoute,
                private db: DatabaseService,
                private recipeCollectionService: RecipeCollectionsService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {

            if (params.searchTerm) { //if its a search term, search
                this.searchTerm = params['searchTerm'];
                this.searchTerm = this.searchTerm.replace(this.searchTerm.charAt(0), this.searchTerm.charAt(0).toUpperCase())
                //this.searchTerm = this.searchTerm.charAt(0).toUpperCase() // TODO: delete this part once we have keywords

                this.db.search(this.searchTerm).then(recipes => {
                    this.recipes = recipes;
                }) //TODO: fix search

            } else if (params.categoryName) { //if it isn't, search through categories
                this.searchTerm = params['categoryName'];

                this.db.getRecipesByCategory(this.searchTerm).then(recipes => {
                    this.recipes = recipes
                })

            } else if (params.type) {
                if (params.type == SubcollectionName.base){
                    this.searchTerm = 'My recipes';

                    this.recipes = this.recipeCollectionService.getSavedRecipesCollection()
                } else {
                    this.searchTerm = 'My favourites';

                    this.recipes = this.recipeCollectionService.getFavouriteRecipesCollection()
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
