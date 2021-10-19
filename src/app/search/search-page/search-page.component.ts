import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router, RouterEvent} from "@angular/router";
import {DatabaseService} from "../../services/database-service";
import {filter} from "rxjs/operators";
import {Recipe} from "../../../../shared/model/Recipe";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy  {

  recipes!: Recipe[];
  searchTerm!: string;
  private sub: any;

  url: String | undefined;
  title?: HTMLElement | null =  document.getElementById(`title`)
  text?: HTMLElement | null =  document.getElementById(`text`)


  constructor(private route: ActivatedRoute, private db:DatabaseService) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {

     if (params.searchTerm) { //if its a search term, search
        this.searchTerm = params['searchTerm'];
       this.searchTerm = this.searchTerm.charAt(0).toUpperCase() // TODO: delete this part once we have keywords

        this.db.search(this.searchTerm).then(recipes =>{
          this.recipes = recipes;
        }) //TODO: fix search

      } else if(params.categoryName){ //if it isn't, search through categories
       this.searchTerm = params['categoryName'];

       this.db.getRecipesByCategory(this.searchTerm).then(recipes => {
         this.recipes = recipes
       })

      } else if(params['my-favourites']){

       /*// @ts-ignore
       this.title.innerHTML = "My favourites"
       // @ts-ignore
       this.text.innerHTML = "You don't have saved favourites yet :("*/

       this.searchTerm = params['my-favourites'];

       //TODO: list out my faourites
       this.recipes = []

     } else if(params['my-recipes']){
       /*// @ts-ignore
       this.title.innerHTML = "My recipes"
       // @ts-ignore
       this.text.innerHTML = "You don't have saved recipes yet :("*/

       this.searchTerm = params['my-recipes'];

       //TODO: list out my saved recipes
       this.recipes = []
       }

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
