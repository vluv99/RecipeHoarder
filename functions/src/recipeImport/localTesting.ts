//var request = require("request");
import {Ingredient} from "../../../shared/model/Ingredient";

const axios = require('axios');

//TODO: Make a static list of ingredients
const a = [
    new Ingredient("Green Bean",10,"kg"),
    new Ingredient("all-purpose flour",10,"kg"),
    new Ingredient("butter,melted",10,"kg"),
    new Ingredient("garlic powder",10,"kg"),
    new Ingredient("toasted sesame oil",10,"kg"),
    new Ingredient("mayonnaise",10,"kg"),
    new Ingredient("Thai sweet chili sauce",10,"kg"),
    new Ingredient("paprika (regular, hot or smoked)",10,"kg"),

    new Ingredient("crispy cooked bacon, crumbled",10,"kg"),
    new Ingredient("salt and ground black pepper to taste",10,"kg"),
    new Ingredient("Dijon mustard",10,"kg"),
    new Ingredient("shallot, thinly sliced",10,"kg"),
    new Ingredient("French-fried onions (such as French's®)",10,"kg")
]
//TODO: give back a list of kcal of the ingredients

function runFoodAPI(searchTerm: string) {
    /*var options = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi",
        json: true
    };*/

    /**
     * Use run configuration to run test.
     * To save changes, first here has to be a build.
     */
    return axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi', {
        "query": searchTerm, //getShortenedSearchTerm(searchTerm),
        "dataType": [
            "Sample",
            "SR Legacy",
            "Branded",
            "Foundation"
        ]
    })
        .then((response: any) => {

            var searchterm = response.data.foodSearchCriteria.query
            const description = response.data.foods[0].description
            const foodCategory = response.data.foods[0].foodCategory
            let kcal = 0;

            for (const foodNutri of response.data.foods[0].foodNutrients) {
                if (foodNutri.unitName == "KCAL" /*&& foodNutri.nutrientName == 'Energy'*/ ){
                    console.log(foodNutri.nutrientName)
                    console.log(foodNutri.nutrientNumber)
                    kcal = foodNutri.nutrientNumber
                }
            }

            console.log({
                "searchterm": searchterm,
                "description": description,
                "foodCategory": foodCategory,
                "energy": kcal + " kcal"
            })
            console.log("----------------------")

            //console.log(response.data.foods[0])
        }).catch((a: any) => {
            console.error("error at: " + searchTerm + " is " + a.response)
            console.log("----------------------")
        })
}
/*
function getShortenedSearchTerm(term: string):string {

    const regex = new RegExp(String.raw`(?(?=[()])(.+)|(?<delete>[,].+))`);
    const res = term.match(regex)

    term = term.replace(res!.groups!.delete, '').trim()
    return term
}*/

for (const ingredient of a) {
    runFoodAPI(ingredient.name)
}

