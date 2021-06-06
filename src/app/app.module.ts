import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeNameBarComponent } from './recipe/recipe-name-bar/recipe-name-bar.component';
import {MatCardModule} from "@angular/material/card";
import { RecipeIngredientComponent } from './recipe/recipe-ingredient/recipe-ingredient.component';
import { RecipeStepComponent } from './recipe/recipe-step/recipe-step.component';



@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeNameBarComponent,
    RecipeIngredientComponent,
    RecipeStepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
