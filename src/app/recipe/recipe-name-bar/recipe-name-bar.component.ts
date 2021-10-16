import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../../shared/model/Recipe";
import { parse } from 'tldts';

@Component({
  selector: 'app-recipe-name-bar',
  templateUrl: './recipe-name-bar.component.html',
  styleUrls: ['./recipe-name-bar.component.scss']
})
export class RecipeNameBarComponent implements OnInit {
  @Input() recipe!: Recipe

  website?: string | null

  website_ico ?: string

    /**
     * 'https://api.statvoo.com/favicon/?url=google.com' - this could work for getting the favicons too
     * 'https://icons.duckduckgo.com/ip3/www.google.com.ico' -  as well as this
     */


  constructor() {  }

  ngOnInit(): void {

    let result = parse(this.recipe.url);
    this.website = result.domainWithoutSuffix
    this.website_ico = 'http://www.google.com/s2/favicons?domain=' + result.hostname
  }



}
