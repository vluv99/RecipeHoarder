

import {Recipe} from "../../../shared/model/Recipe";


import {Pipeline} from "./Pipeline";
import {FetchUrlData} from "./modules/FetchUrlData";
import {JsonLdExtractor} from "./modules/JsonLdExtractor";
import {SeparateIngredients} from "./modules/SeparateIngredients";
import {CalorieCalculator} from "./modules/CalorieCalculator";


const recipesPipeline = new Pipeline([
    new FetchUrlData(),
    new JsonLdExtractor(),
    new SeparateIngredients(),
    new CalorieCalculator()/*,
    new ImageDownloader()*/
]);

export async function getData2(url: string) {
    let r = Recipe.empty();

    r.url = url;

    await recipesPipeline.run(r)

    return r;
}
