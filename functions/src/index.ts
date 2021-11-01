import * as functions from "firebase-functions";
import {getData2} from "./core";

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
