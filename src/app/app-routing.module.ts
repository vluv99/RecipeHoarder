import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {SearchPageComponent} from "./search/search-page/search-page.component";
import {ImportComponent} from "./import/import.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ImportRecipeDataComponent} from "./import-recipe-data/import-recipe-data.component";

import {canActivate, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '',                           component: HomeComponent,           ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'recipe/:recipeId',           component: RecipeComponent,         ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'category/:categoryName',     component: SearchPageComponent,     ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'search/:searchTerm',         component: SearchPageComponent,     ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'import',                     component: ImportComponent,         ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'shopping-list',              component: ShoppingListComponent,   ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'register',                   component: RegisterComponent },
  { path: 'login',                      component: LoginComponent },
  { path: 'recipe-data',                component: ImportRecipeDataComponent,...canActivate(redirectUnauthorizedToLogin) },
  { path: 'collections/:my-favourites', component: SearchPageComponent,      ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'collections/:my-recipes',    component: SearchPageComponent,      ...canActivate(redirectUnauthorizedToLogin) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
