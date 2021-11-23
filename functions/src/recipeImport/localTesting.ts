
/*
function getShortenedSearchTerm(term: string):string {

    const regex = new RegExp(String.raw`(?(?=[()])(.+)|(?<delete>[,].+))`);
    const res = term.match(regex)

    term = term.replace(res!.groups!.delete, '').trim()
    return term
}*/
/*
for (const ingredient of a) {
    runFoodAPI(ingredient)
}
*/

import {getData2} from "./core";


const urls = [
    "https://www.delish.com/cooking/recipe-ideas/recipes/a50609/classic-eggnog-recipe/",
    "https://www.delish.com/cooking/recipe-ideas/a29251509/crockpot-turkey-breast-recipe/",
    "https://www.delish.com/holiday-recipes/thanksgiving/a29178179/easy-giblet-gravy-recipe/",
    "https://www.delish.com/cooking/recipe-ideas/a57097/crock-pot-christmas-ham-recipe/",
    "https://tasty.co/recipe/little-debbie-inspired-christmas-tree-cakes"
]

async function run() {
    for (const url of urls) {
        let rec = await getData2(url);
        if(rec.calories != undefined && rec.calories != 0){
            console.log("✅ Found kcal: " + rec.calories);
        }
        else {
            console.log("❌ No kcal");
        }

    }
}
run();



