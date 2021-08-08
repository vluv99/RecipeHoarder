import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {SearchPageComponent} from "./search/search-page/search-page.component";
import {ImportComponent} from "./import/import.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:recipeId', component: RecipeComponent },
  { path: 'category/:categoryName', component: RecipeComponent },
  { path: 'search/:searchTerm', component: SearchPageComponent },
  { path: 'import', component: ImportComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
