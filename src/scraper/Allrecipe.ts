import {Ingredient} from "../model/Ingredient";
import {Recipe} from "../model/Recipe";
import * as cheerio from 'cheerio';

const scrape = ($: cheerio.CheerioAPI) => {

  var ldJsonText = $('script[type="application/ld+json"]')
  var select = ldJsonText.first().html()
  if (typeof select === "string") {
    var ldData = JSON.parse(select);
  }

  var r;

  ldData.forEach((element:any) => {
    if(element["@type"] =="Recipe"){
      const name = element["name"];
      const url = "";
      const description = element["description"];

      const ingredients:Ingredient[] = [];

      element["recipeIngredient"].forEach((ing:any) => {

        const n = ing;
        ingredients.push(new Ingredient(n));
      });



      r = new Recipe(name, url, description, ingredients, []);
    }
  });

  return r;
}

export {scrape}
