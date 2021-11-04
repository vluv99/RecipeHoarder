import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {SubcollectionName, UserDatabaseService} from "./user-database.service";


@Injectable({
    providedIn: 'root'
})
export class RecipeCollectionsService {

    constructor(private authService:AuthService,
                private userDatabaseService:UserDatabaseService) {
    }

    // bookmark collection functions
    addRecipeToUserCollection(recipeId: string){
        return this.userDatabaseService.addToCollection( SubcollectionName.base, recipeId)
    }

    isRecipeInUserCollection(recipeId: string){
        return this.userDatabaseService.checkIfRecipeInCollection( SubcollectionName.base, recipeId)
    }

    removeRecipeFromUserCollection(recipeId: string){

        if(this.isRecipeInFavouritesCollection(recipeId)){

            this.removeRecipeFromFavouritesCollection(recipeId).then(() => {
                return this.userDatabaseService.deleteFromCollection( SubcollectionName.base, recipeId)
            })
        }

         return this.userDatabaseService.deleteFromCollection( SubcollectionName.base, recipeId)
    }

    getSavedRecipesCollection(){
        return this.userDatabaseService.getRecipesInCollection( SubcollectionName.base)
    }

    // favourites collection functions
    addRecipeToFavouritesCollection(recipeId: string){
        return this.userDatabaseService.addToCollection( SubcollectionName.favourites, recipeId)
    }

    isRecipeInFavouritesCollection(recipeId: string){
        return this.userDatabaseService.checkIfRecipeInCollection( SubcollectionName.favourites, recipeId)
    }

    removeRecipeFromFavouritesCollection(recipeId: string){
        return this.userDatabaseService.deleteFromCollection( SubcollectionName.favourites, recipeId)
    }

    getFavouriteRecipesCollection(){
        return this.userDatabaseService.getRecipesInCollection( SubcollectionName.favourites)
    }

}
