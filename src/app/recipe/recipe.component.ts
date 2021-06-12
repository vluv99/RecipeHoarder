import {Component, OnInit} from '@angular/core';
import { getData } from 'src/scraper/core';
import {Recipe} from "../../model/Recipe";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe = new Recipe("", "", []);


  /*
  ingredients: String[] = ["1kg alma", "2.5dkg flour", "500g sugar", "1kg pears"];
  directions: String[] = [
    "Preheat oven to 425 degrees F (220 degrees C). Melt the butter in a saucepan. Stir in flour to form a paste. Add water, white sugar and brown sugar, and bring to a boil. Reduce temperature and let simmer.",
    "Place the bottom crust in your pan. Fill with apples, mounded slightly. Cover with a lattice work crust. Gently pour the sugar and butter liquid over the crust. Pour slowly so that it does not run off.",
    "Bake 15 minutes in the preheated oven. Reduce the temperature to 350 degrees F (175 degrees C). Continue baking for 35 to 45 minutes, until apples are soft."
  ]*/


  constructor() {
    getData("https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/").then(r=>{
      this.recipe = r;
    });
  }

  ngOnInit(): void {
  }

}
