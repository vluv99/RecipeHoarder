import axios from 'axios';
import * as cheerio from 'cheerio';
import {Recipe} from "../model/Recipe";
import * as allrecipe from "./Allrecipe";

var scrappers: { [id: string]: any; } = {}

scrappers['www.allrecipes.com'] = allrecipe.scrape;

export async function getData(url: string) :Promise<Recipe> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: false, decodeEntities: true });

    var r = scrappers['www.allrecipes.com']($)

    return r;
  } catch (error) {
    throw error;
  }
}
