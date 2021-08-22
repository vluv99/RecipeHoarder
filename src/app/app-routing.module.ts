import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {SearchPageComponent} from "./search/search-page/search-page.component";
import {ImportComponent} from "./import/import.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:recipeId', component: RecipeComponent },
  { path: 'category/:categoryName', component: RecipeComponent },
  { path: 'search/:searchTerm', component: SearchPageComponent },
  { path: 'import', component: ImportComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
