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
import {MatDividerModule} from "@angular/material/divider";
import { HomeComponent } from './home/home/home.component';
import { CategoryComponent } from './home/home/category-selector/category/category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { HorizontalListComponent } from './components/horizontal-list/horizontal-list.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { SearchPageComponent } from './search/search-page/search-page.component';
import { ImportComponent } from './import/import.component';
import {MatInputModule} from "@angular/material/input";
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeNameBarComponent,
    RecipeIngredientComponent,
    RecipeStepComponent,
    HomeComponent,
    CategoryComponent,
    RecipeCardComponent,
    HorizontalListComponent,
    SearchBarComponent,
    SearchPageComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8081] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
