import axios from 'axios';
import * as cheerio from 'cheerio';
import { parse } from 'tldts';

import {Recipe} from "../../shared/model/Recipe";

import * as allrecipe from "./Allrecipe";
import * as taste from "./Taste-com-au";
import * as tasty from "./Tasty";
import * as bbcgoodfood from "./bbcgoodfood";
import * as merged from "./merged";
import * as separateIngredients from "./separateIngredients";
import {Pipeline} from "./Pipeline";
import {FetchUrlData} from "./modules/FetchUrlData";
import {JsonLdExtractor} from "./modules/JsonLdExtractor";
import {SeparateIngredients} from "./modules/SeparateIngredients";
import {ImageDownloader} from "./modules/ImageDownloader";

var scrapers: { [id: string]: any; } = {}

scrapers['allrecipes.com'] = allrecipe.getRecipeData;
scrapers['taste.com.au'] =  taste.getRecipeData;
scrapers['tasty.co'] = tasty.getRecipeData;
scrapers['bbcgoodfood.com'] = bbcgoodfood.getRecipeData;

const scraper = merged.getRecipeData;
const si = separateIngredients.separate;

export async function getData(url: string) :Promise<Recipe> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: false, decodeEntities: true });
    const domain = (new URL(url)).hostname;

    const d = parse(domain)
    // @ts-ignore
    const hostName = d.domain.toString()

    console.log("host name : " + hostName)
    // get recipe from web
    //var r = scrapers[hostName]($, url)
    let r = scraper($, url)

    // separate ingredients data
    r = si(r)

    // calculate calorie data if its not in the json
    // TODO...

    return r;
  } catch (error) {
    throw error;
  }
}



const recipesPipeline = new Pipeline([
    new FetchUrlData(),
    new JsonLdExtractor(),
    new SeparateIngredients(),
    new ImageDownloader()
]);

export async function getData2(url: string) {
    let r = Recipe.empty();

    r.url = url;

    await recipesPipeline.run(r)

    return r;
}
