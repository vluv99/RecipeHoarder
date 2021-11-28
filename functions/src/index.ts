import * as functions from "firebase-functions";
import {getData2} from "./recipeImport/core";
import {addToShoppinglistMeta, updateShoppinglistMeta} from "./shoppinglist/newShoppinglistItemHandler";

export const importRecipe = functions.https.onCall(async (data, context) => {

  let url: string | undefined = data.url?.toString();
  if (!url) {
    return;
  }

  functions.logger.info("Got url from import: " + url, {structuredData: true});

  const r = await getData2(url)

  functions.logger.info(r)

  return JSON.stringify(r);

});


exports.updatedShoppinglistItem = functions.firestore
    .document('users/{userId}/shoppinglist/{shoppinglistId}')
    .onUpdate(updateShoppinglistMeta);

exports.addedShoppinglistItem = functions.firestore
    .document('users/{userId}/shoppinglist/{shoppinglistId}')
    .onCreate(addToShoppinglistMeta);
