import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router, RouterEvent} from "@angular/router";
import {Recipe} from "../../../model/Recipe";
import {DatabaseService} from "../../services/database-service";
import {filter} from "rxjs/operators";
import * as url from "url";

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

        this.recipes = this.db.search(this.searchTerm) //TODO: fix search

      } else if(params.categoryName){ //if it isn't, search through categories
       this.searchTerm = params['categoryName'];

       //this.recipes = this.db.search(this.searchTerm)
       //TODO: category search once the firebase model is done
       this.recipes = []

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
