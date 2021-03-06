import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeNameBarComponent} from './recipe/recipe-name-bar/recipe-name-bar.component';
import {MatCardModule} from "@angular/material/card";
import {RecipeIngredientComponent} from './recipe/recipe-ingredient/recipe-ingredient.component';
import {RecipeStepComponent} from './recipe/recipe-step/recipe-step.component';
import {MatDividerModule} from "@angular/material/divider";
import {HomeComponent} from './home/home/home.component';
import {CategoryComponent} from './home/home/category-selector/category/category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {RecipeCardComponent} from './components/recipe-card/recipe-card.component';
import {HorizontalListComponent} from './components/horizontal-list/horizontal-list.component';
import {SearchBarComponent} from './search/search-bar/search-bar.component';
import {SearchPageComponent} from './search/search-page/search-page.component';
import {ImportComponent} from './import/import.component';
import {MatInputModule} from "@angular/material/input";
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

import {USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from '@angular/fire/compat/database';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';

import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingListInputComponent} from './shopping-list/shopping-list-input/shopping-list-input.component';
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {ListItemComponent} from './shopping-list/list-item/list-item.component';
import {IngredientSuggestionComponent} from './shopping-list/ingredient-suggestion/ingredient-suggestion.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegisterComponent} from './auth/register/register.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {LoginComponent} from './auth/login/login.component';
import {CoolSocialLoginButtonsModule} from "@angular-cool/social-login-buttons";
import {ImportRecipeDataComponent} from './import-recipe-data/import-recipe-data.component';
import {MatChipsModule} from '@angular/material/chips';
import {ChipsMultiSelectComponent} from './components/chips-multi-select/chips-multi-select.component';
import {IngredientFieldComponent} from './import-recipe-data/ingredient-fields/ingredient-field.component';
import {StepFieldComponent} from './import-recipe-data/step-fields/step-field.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthService} from "./services/auth-service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {ReportRecipeListComponent} from "./recipe/report-recipe-list/report-recipe-list.component";
import { ServiceWorkerModule } from '@angular/service-worker';


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
        ImportComponent,
        ShoppingListComponent,
        ShoppingListInputComponent,
        ListItemComponent,
        IngredientSuggestionComponent,
        RegisterComponent,
        LoginComponent,
        ImportRecipeDataComponent,
        ChipsMultiSelectComponent,
        IngredientFieldComponent,
        StepFieldComponent,
        ReportRecipeListComponent
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
        AngularFireFunctionsModule,
        AngularFirestoreModule,
        MatSelectModule,
        MatOptionModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CoolSocialLoginButtonsModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatListModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: /*true,*/environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
        AngularFirestoreModule.enablePersistence()
    ],
    providers: [
        {provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099', 9099] : undefined},
        {provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined},
        {provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8081] : undefined},
        {provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined},
        MatDatepickerModule,
        AuthService,
        {provide: MatBottomSheetRef, useValue: {} },
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
