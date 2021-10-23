import * as functions from "firebase-functions";
//import {Recipe} from "../../shared/model/Recipe";
import {/*getData, */getData2} from "./core";

//import {Recipe} from "/shared/model/Recipe";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
//export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
//});
/*
const cors = require('cors')({
  origin: true,
});*/

/*
export const importRecipe = functions.https.onRequest((request, response) => {
  // data = URL of the recipe to import from the site input filed

  //TODO:!! Remove in prod
  cors(request, response, () => {

    let url: string | undefined = request.query.url?.toString();
    if (!url) {
      response.send("Error");
      return;
    }

    functions.logger.info("Got url from import: " + url, {structuredData: true});

    getData(url).then((recipe) => {
      response.send(recipe);
    });

    //let recipe :Recipe = new Recipe("a","tst",url, "...amm idk",[], [] );

  });

});
*/

export const importRecipe = functions.https.onCall(async (data, context) => {
  // data = URL of the recipe to import from the site input filed


  let url: string | undefined = data.url?.toString();
  if (!url) {
    return;
  }

  functions.logger.info("Got url from import: " + url, {structuredData: true});

  //let r = await getData(url)

  const r = await getData2(url)

  functions.logger.info(r)

  return JSON.stringify(r);

  //let recipe :Recipe = new Recipe("a","tst",url, "...amm idk",[], [] );


});
