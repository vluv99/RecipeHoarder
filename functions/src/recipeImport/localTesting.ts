//var request = require("request");
import {Ingredient} from "../../../shared/model/Ingredient";

const axios = require('axios');

//TODO: Make a static list of ingredients
const a = [new Ingredient("Green Bean",10,"kg")]
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
        "query": searchTerm,
        "dataType": [
            "Foundation",
            "Sample",
            "SRLegacy"
        ]
    })
        .then((response: any) => {
            console.log(response.data.foods[0])
        }).catch((a: any) => {
            console.log(a.response)
        })
}

runFoodAPI(a[0].name)
