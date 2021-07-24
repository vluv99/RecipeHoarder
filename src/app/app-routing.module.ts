import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {RecipeComponent} from "./recipe/recipe.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:recipeId', component: RecipeComponent },
  { path: 'category/:categoryName', component: RecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
