import {Ingredient, Measurement} from "../../shared/model/Ingredient";
import {Recipe} from "../../shared/model/Recipe";
import * as cheerio from 'cheerio';
import {Steps} from "../../shared/model/Steps";
import * as moment from "moment";

export function getRecipeData($: cheerio.CheerioAPI, _url: String) {

  let ldJsonText = $('script[type="application/ld+json"]');   // select the script tag
  let select = ldJsonText.first().html();     // select the first that matches

  if (typeof select === "string") {   //
    var ldData = JSON.parse(select);
  }

  //let r: Recipe = new Recipe("" ,"", new URL(""),"", "", [], []); // new recipe to import into
  let r: Recipe | null = null;

  ldData.forEach((element:any) => { // go through the respinse array
    if(element["@type"] =="Recipe"){ // check to make sure we're working with "recipe"

      const name = element["name"];

      //Firebase is going to add the ID, so we're leaving it empty
      r = new Recipe("" ,name);


      r.image = element["image"].url;
      r.url = _url;
      r.description = element["description"];

      let time = moment.duration(element["totalTime"]);
      r.totalCookTime = time;

      let cal =  element["nutrition"].calories;
      if (cal != null) {
        //only keep the numbers
        cal = cal.replace("calories", "");
      }
      let cal2 = parseInt(cal);
      r.calories = cal2;

      element["recipeIngredient"].forEach((ing:any) => {
        const n = ing;
        r?.ingredients.push(new Ingredient(n,1,Measurement.KG));
      });

      let num = 1;
      element["recipeInstructions"].forEach((st:any) => {
        const s = st.text;
        r?.steps.push(new Steps(num, s))
        num++;
      })
    }
  });

  return r;
}
