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

    recipeBookmarkState = RecipeBookmarkState.add
    bookmarkStateType = RecipeBookmarkState

    recipeFavouriteState = RecipeBookmarkState.add
    FavoriteStateType = RecipeBookmarkState

    /*
     * 'https://api.statvoo.com/favicon/?url=google.com' - this could work for getting the favicons too
     * 'https://icons.duckduckgo.com/ip3/www.google.com.ico' -  as well as this
     */


    constructor(private recipeCollectionService: RecipeCollectionsService) {
    }

    ngOnInit(): void {

        let result = parse(this.recipe.url);
        this.website = result.domainWithoutSuffix
        this.website_ico = 'http://www.google.com/s2/favicons?domain=' + result.hostname


        this.recipeCollectionService.isRecipeInUserCollection(this.recipe.id!).then((val) => {
            if (val) {
                this.recipeBookmarkState = RecipeBookmarkState.delete
            } else {
                this.recipeBookmarkState = RecipeBookmarkState.add
            }
        })
    }

    fabClicked(recipeState: RecipeBookmarkState, buttonClicked: string) {

        if (recipeState == RecipeBookmarkState.add) {

            if (buttonClicked == "bookmarker") {
                //Set to loader
                this.recipeBookmarkState = RecipeBookmarkState.inProgress

                this.recipeCollectionService.addRecipeToUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeBookmarkState = RecipeBookmarkState.delete
                }).catch(() => {
                    this.recipeBookmarkState = RecipeBookmarkState.add;
                    alert("Couldn't add recipe")
                })

            }else if(buttonClicked == "favourite"){
                //Set to loader
                this.recipeFavouriteState = RecipeBookmarkState.inProgress

                /*this.recipeCollectionService.removeRecipeFromUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeFavouriteState = RecipeBookmarkState.add
                }).catch(() => {
                    this.recipeFavouriteState = RecipeBookmarkState.delete;
                    alert("Couldn't remove recipe")
                })*/
            }

        } else if (recipeState == RecipeBookmarkState.delete) {

            if (buttonClicked == "bookmarker") {
                //Set to loader
                this.recipeBookmarkState = RecipeBookmarkState.inProgress

                this.recipeCollectionService.removeRecipeFromUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeBookmarkState = RecipeBookmarkState.add
                }).catch(() => {
                    this.recipeBookmarkState = RecipeBookmarkState.delete;
                    alert("Couldn't remove recipe")
                })
                
            }else if(buttonClicked == "favourite"){
                //Set to loader
                this.recipeFavouriteState = RecipeBookmarkState.inProgress

                /*this.recipeCollectionService.removeRecipeFromUserCollection(this.recipe.id!).then(() => {
                    //set to successfull
                    this.recipeFavouriteState = RecipeBookmarkState.add
                }).catch(() => {
                    this.recipeFavouriteState = RecipeBookmarkState.delete;
                    alert("Couldn't remove recipe")
                })*/
            }
        }
    }

}

export enum RecipeBookmarkState {
    add,
    delete,
    inProgress
}
