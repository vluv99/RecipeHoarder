import axios from 'axios';
import * as cheerio from 'cheerio';

import {Recipe} from "../../shared/model/Recipe";

import * as allrecipe from "./Allrecipe";
import * as taste from "./Taste-com-au";

var scrapers: { [id: string]: any; } = {}

scrapers['www.allrecipes.com'] = allrecipe.getRecipeData;
scrapers['www.taste.com.au'] =  taste.getRecipeData;

export async function getData(url: string) :Promise<Recipe> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: false, decodeEntities: true });
    const domain = (new URL(url)).hostname;

    // get recipe from web
    var r = scrapers[domain]($, url)

    // separate ingredients data
    // TODO...

    // calculate calorie data if its not in the json
    // TODO...

    return r;
  } catch (error) {
    throw error;
  }
}
