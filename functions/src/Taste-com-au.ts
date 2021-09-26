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

  let r: Recipe | null = null;
  let recipeLD: any;
  if (Array.isArray(ldData)) {
    ldData.forEach((element: any) => {
      if (ldData["@type"] == "Recipe") {
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
  r.url = _url;
  r.description = recipeLD["description"];

  let time = moment.duration(recipeLD["totalTime"]);
  r.totalCookTime = time;

  let cal = recipeLD["nutrition"].calories;
  if (cal != null) {
    //only keep the numbers
    cal = cal.replace("calories", "");
  }
  let cal2 = parseInt(cal);
  r.calories = cal2;

  recipeLD["recipeIngredient"].forEach((ing: any) => {
    const n = ing;
    r?.ingredients.push(new Ingredient(n, 1, Measurement.KG));
  });

  let num = 1;
  recipeLD["recipeInstructions"].forEach((st: any) => {
    const s = st; //!!! here, its only an array element
    r?.steps.push(new Steps(num, s))
    num++;
  })

  return r;
}

/*var recipeData: any;

ldJsonText.each((index: any, element) => {
  // @ts-ignore
  let text = $(this).text() // select converted element
  // @ts-ignore
  console.log(JSON.parse(text))

  if (typeof text === "string") {   //making sure its a string
    //var data = JSON.parse(text);

  }

  //if (data["@type"] == "Recipe") { // check to make sure we're working with "recipe"
  //  recipeData = data;
  //  console.log(recipeData)
  //}
}) // check each element if theres more than one "application/ld+json"



if (recipeData != null && recipeData != undefined) {
  let r: Recipe | null = null; // new recipe to import into

  if (recipeData["@type"] == "Recipe") { // check to make sure we're working with "recipe"

    const name = recipeData["name"];

    //Firebase is going to add the ID, so we're leaving it empty
    r = new Recipe("", name);

    r.image = recipeData["image"][0]; // first pic is the biggest
    r.url = _url;
    r.description = recipeData["description"];

    let time = moment.duration(recipeData["totalTime"]);
    r.totalCookTime = time;

    let cal = recipeData["nutrition"].calories;
    cal = cal.replace("calories", "");
    let cal2 = parseInt(cal);
    r.calories = cal2;

    recipeData["recipeIngredient"].forEach((ing: any) => {
      const n = ing;
      r?.ingredients.push(new Ingredient(n, 1, Measurement.KG));
    });

    let num = 1;
    recipeData["recipeInstructions"].forEach((st: any) => {
      const s = st.text;
      r?.steps.push(new Steps(num, s))
      num++;
    })
  }
  return r;

}

return "Didn't work! :(";
}   */
