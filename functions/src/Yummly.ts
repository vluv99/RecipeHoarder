import {Ingredient, Measurement} from "../../shared/model/Ingredient";
import {Recipe} from "../../shared/model/Recipe";
import * as cheerio from 'cheerio';
import {Steps} from "../../shared/model/Steps";
import * as moment from "moment";

export function getRecipeData($: cheerio.CheerioAPI, _url: string) {

  let ldJsonText = $('script[type="application/ld+json"]');   // select the script tag
  let select = ldJsonText.first().html();     // select the first that matches

  if (typeof select === "string") {   //making sure its a string
    var element = JSON.parse(select);
  }


  let r: Recipe | null = null; // new recipe to import into

  if (element["@type"] == "Recipe") { // check to make sure we're working with "recipe"

    const name = element["name"];

    //Firebase is going to add the ID, so we're leaving it empty
    r = new Recipe("", name);

    r.image = element["image"][0]; // first pic is the biggest
    r.url = _url;
    r.description = element["description"];

    let time = moment.duration(element["totalTime"]);
    r.totalCookTime = time;

    let cal = element["nutrition"].calories;
    cal = cal.replace("calories", "");
    let cal2 = parseInt(cal);
    r.calories = cal2;

    element["recipeIngredient"].forEach((ing: any) => {
      const n = ing;
      r?.ingredients.push(new Ingredient(n, 1, Measurement.KG));
    });

    //TODO: YUMMLY doesnt always have steps, so going to leave it for now.
    let num = 1;
    element["recipeInstructions"].forEach((st: any) => {
      const s = st.text;
      r?.steps.push(new Steps(num, s))
      num++;
    })
  }

  return r;
}
