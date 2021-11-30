import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../../shared/model/Recipe";
import {parse} from 'tldts';
import {RecipeCollectionsService} from "../../services/recipe-collections.service";

@Component({
    selector: 'app-recipe-name-bar',
    templateUrl: './recipe-name-bar.component.html',
    styleUrls: ['./recipe-name-bar.component.scss']
})
export class RecipeNameBarComponent implements OnInit {
    @Input() recipe!: Recipe

    website?: string | null

    website_ico ?: string

    recipeBookmarkState = RecipeProcessState.add
    bookmarkStateType = RecipeProcessState

    recipeFavouriteState = RecipeProcessState.add
    FavoriteStateType = RecipeProcessState

    /*
     * 'https://api.statvoo.com/favicon/?url=google.com' - this could work for getting the favicons too
     * 'https://icons.duckduckgo.com/ip3/www.google.com.ico' -  as well as this
     */


    constructor(private recipeCollectionService: RecipeCollectionsService) {
    }

    ngOnInit(): void {

        if (this.recipe.url == ""){
            this.website = "Recipe Hoarder"
            this.website_ico = "/favicon.ico";
        }
        else {

            let result = parse(this.recipe.url);
            this.website = result.domainWithoutSuffix
            this.website_ico = 'http://www.google.com/s2/favicons?domain=' + result.hostname
        }

        this.recipeCollectionService.isRecipeInUserCollection(this.recipe.id!).then((val) => {
            if (val) {
                this.recipeBookmarkState = RecipeProcessState.delete
            } else {
                this.recipeBookmarkState = RecipeProcessState.add
            }
        })

        this.recipeCollectionService.isRecipeInFavouritesCollection(this.recipe.id!).then((val) => {
            if (val) {
                this.recipeFavouriteState = RecipeProcessState.delete
            } else {
                this.recipeFavouriteState = RecipeProcessState.add
            }
        })
    }

    fabClicked(buttonClicked: string) {
        if (buttonClicked == "bookmarker") {

            if (this.recipeBookmarkState == RecipeProcessState.add) {
                //Set to loader
                this.recipeBookmarkState = RecipeProcessState.inProgress

                this.recipeCollectionService.addRecipeToUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeBookmarkState = RecipeProcessState.delete
                }).catch(() => {
                    this.recipeBookmarkState = RecipeProcessState.add;
                    alert("Couldn't add recipe")
                })

            } else {
                //Set to loader
                this.recipeBookmarkState = RecipeProcessState.inProgress

                this.recipeCollectionService.removeRecipeFromUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeBookmarkState = RecipeProcessState.add
                }).catch(() => {
                    this.recipeBookmarkState = RecipeProcessState.delete;
                    alert("Couldn't remove recipe")
                })
            }

        }else if(buttonClicked == "favourite"){

            if (this.recipeFavouriteState == RecipeProcessState.add) {
                //Set to loader
                this.recipeFavouriteState = RecipeProcessState.inProgress

                this.recipeCollectionService.addRecipeToFavouritesCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeFavouriteState = RecipeProcessState.delete
                }).catch(() => {
                    this.recipeFavouriteState = RecipeProcessState.add;
                    alert("Couldn't add to favourites")
                })

            } else {
                //Set to loader
                this.recipeFavouriteState = RecipeProcessState.inProgress

                this.recipeCollectionService.removeRecipeFromFavouritesCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeFavouriteState = RecipeProcessState.add
                }).catch(() => {
                    this.recipeFavouriteState = RecipeProcessState.delete;
                    alert("Couldn't remove from favourites")
                })
            }
        }

    }

}

export enum RecipeProcessState {
    add,
    delete,
    inProgress
}
