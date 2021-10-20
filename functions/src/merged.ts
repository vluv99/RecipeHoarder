import {Ingredient, Measurement} from "../../shared/model/Ingredient";
import {Recipe} from "../../shared/model/Recipe";
import * as cheerio from 'cheerio';
import {Steps} from "../../shared/model/Steps";
import * as moment from "moment";
import { parse } from 'tldts';

export function getRecipeData($: cheerio.CheerioAPI, _url: string) {
  const host = parse(_url).domainWithoutSuffix

  const ldJsonText = $('script[type="application/ld+json"]');   // select the script tag
  const select = ldJsonText.first().html();     // select the first that matches

  if (typeof select === "string") {   //
    var ldData = JSON.parse(select);
  }

  let r: Recipe | null = null;

  let recipeLD: any;

  if (Array.isArray(ldData)) {
    ldData.forEach((element: any) => {
      if (element["@type"] == "Recipe") {
        recipeLD = element;
      }
    });
  } else {
    if (ldData["@type"] == "Recipe") {
      recipeLD = ldData;
    }
  }

  const name = recipeLD["name"];

  //Firebase is going to add the ID, so we're leaving it empty
  r = new Recipe("", name);

  r.image = recipeLD["image"].url;
  if (r.image == null){
    r.image = recipeLD["video"].thumbnailUrl;
  }

  r.url = _url;
  r.description = recipeLD["description"];

  const time = moment.duration(recipeLD["totalTime"]).asMinutes();
  r.totalCookTime = time;

  let cal = recipeLD["nutrition"]?.calories;
  if (cal != null) {
    //only keep the numbers
    cal = cal.replace("calories", "");
  }
  const cal2 = parseInt(cal);
  r.calories = cal2;

  recipeLD["recipeIngredient"].forEach((ing: any) => {
    const n = ing;
    r?.ingredients.push(new Ingredient(n, 1, Measurement.KG));
  });

  let num = 1;
  recipeLD["recipeInstructions"].forEach((st: any) => {
    if (host == "bbcgoodfood") {
      var s =  st.text.replace(/<[^>]+>/g, ''); //removes unnecessary HTML elements from the text

    } else if(host == "taste"){
      var s = st;   //here, its only an array element

    } else {    /** allrecipes & tasty **/
      var s = st.text;  // basic json structure
    }
    r?.steps.push(new Steps(num, s))
    num++;
  })

  return r;
}
