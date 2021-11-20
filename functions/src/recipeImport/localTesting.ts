import {Ingredient} from "../../../shared/model/Ingredient";

import Qty from 'js-quantities';
//const Qty = require('js-quantities');


const axios = require('axios');

let units: string[] = [];
const cats = ["mass", "volume", "length"];

for (const cat of cats) {
    for (const unit of Qty.getUnits(cat)) {
        units = [...units, ...Qty.getAliases(unit)];
    }
}
//let qty = Qty('10 kg')
//let qty2 = Qty('10 dkg')
//console.log(units)
//console.log(qty.to(qty2).toString())

//TODO: Make a static list of test ingredients
const a = [
    new Ingredient("Green Bean",0.5,"kg"),
    new Ingredient("all-purpose flour",1,"kg"),
    new Ingredient("butter,melted",2,"cups"),
    new Ingredient("garlic powder",5,"g"),
    new Ingredient("toasted sesame oil",3,"tablespoons"),
    new Ingredient("mayonnaise",2,"teaspoons"),
    new Ingredient("Thai sweet chili sauce",2,"cups"),
    new Ingredient("paprika (regular, hot or smoked)",3,"tablespoons"),

    new Ingredient("crispy cooked bacon, crumbled",0,""),
    new Ingredient("salt and ground black pepper to taste",0,""),
    new Ingredient("Dijon mustard",5,"tablespoons"),
    new Ingredient("shallot, thinly sliced",0,""),
    new Ingredient("French-fried onions (such as French's®)",1,"kg")
]
//TODO: give back a list of kcal of the ingredients

function runFoodAPI(searchTerm: Ingredient) {
    /*var options = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi",
        json: true
    };*/

    /**
     * Use run configuration to run test.
     * To save changes, first here has to be a build.
     */
    return axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi', {
        "query": searchTerm.name, //getShortenedSearchTerm(searchTerm),
        "dataType": [
            "Sample",
            "SR Legacy",
            "Branded",
            "Survey (FNDDS)",
            "Foundation"
        ]
    })
        .then((response: any) => {

            var searchterm = response.data.foodSearchCriteria.query
            const description = response.data.foods[0].description
            const foodCategory = response.data.foods[0].foodCategory
            const servingSize = response.data.foods[0].servingSize
            const servingSizeUnit = response.data.foods[0].servingSizeUnit
            const packageWeight = response.data.foods[0].packageWeight
            let kcal = 0;
            let calculatedKCAL = 0;

            for (const foodNutri of response.data.foods[0].foodNutrients) {
                if (foodNutri.unitName == "KCAL" /*&& foodNutri.nutrientName == 'Energy'*/ ){
                    console.log(foodNutri.nutrientName)
                    console.log(foodNutri.value)
                    kcal = foodNutri.value //calculated from value per serving size measure
                }
            }

            const pw = packageWeight.split('/')
            for (let i = 0; i < pw.length; i++) {
                const u = pw[i].trim().split(' ')
                if (units.includes(u[1].trim().toLowerCase() ) ){
                    //calculatedKCAL = calculateKCAL(searchTerm, kcal, servingSize, servingSizeUnit) + " kcal"
                    calculatedKCAL = calculateKCAL(searchTerm, kcal, u[0], u[1])
                }

                if (calculatedKCAL != 0){
                    break;
                }
            }


            console.log({
                "searchterm": searchterm,
                "description": description,
                "foodCategory": foodCategory,
                "servingSize": servingSize + " " + servingSizeUnit,
                "ogEnergy": kcal + " kcal",
                "packageWeight": packageWeight,
                "calculatedEnergy": calculatedKCAL/*calculateKCAL(searchTerm, kcal, servingSize, servingSizeUnit)*/ + " kcal"
            })
            console.log("----------------------")

            //console.log(response.data.foods[0])
        }).catch((a: any) => {
            console.error("error at: " + searchTerm + " is " + a.response)
            console.log("----------------------")
        })
}

function calculateKCAL(i:Ingredient, kcal:number, servingSize:number|undefined, servingUnit:string|undefined){
    let res:number = kcal;
    if (servingSize != undefined && servingUnit != undefined &&
        units.includes(i.measurement) &&
        units.includes(servingUnit)){
        const qty = Qty(i.amount + " " + i.measurement)
        const calc = qty.to(servingUnit).scalar / servingSize
        res *= calc;
    }

    return Math.round(res);
}

/*
function getShortenedSearchTerm(term: string):string {

    const regex = new RegExp(String.raw`(?(?=[()])(.+)|(?<delete>[,].+))`);
    const res = term.match(regex)

    term = term.replace(res!.groups!.delete, '').trim()
    return term
}*/

for (const ingredient of a) {
    runFoodAPI(ingredient)
}

