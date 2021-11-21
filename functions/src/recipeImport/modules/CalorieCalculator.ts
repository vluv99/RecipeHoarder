import {ImportData, PipelineModule} from "../Pipeline";

import Qty from 'js-quantities';
import {Ingredient} from "../../../../shared/model/Ingredient";
import axios from "axios";

export class CalorieCalculator implements PipelineModule {
    units: string[] = [];
    cats = ["mass", "volume", "length"];

    run(imp: ImportData): Promise<void> {
        if (imp.r.calories != 0) {
            // get units array
            for (const cat of this.cats) {
                for (const unit of Qty.getUnits(cat)) {
                    this.units = [...this.units, ...Qty.getAliases(unit)];
                }
            }

            let calculatedKCAL = 0;
            let calculatedIngredients = 0;

            imp.r.ingredients.forEach(async (i: Ingredient) => {
                console.log(i);

                await this.runFoodAPI(i).then((res) => {
                    console.log("calorie calc res: " + res);
                    if (res != undefined) {
                        calculatedIngredients++;
                        calculatedKCAL += res;
                    }
                });
                console.log("------------");

            })

            //if (imp.r.ingredients.length * 0.8 <= calculatedIngredients){

                console.log("calculated calries res: " + calculatedKCAL + "\n" +
                            "calculated ing numb: " + calculatedIngredients)
                imp.r.calories = calculatedKCAL;
            //}

        }

        return Promise.resolve(undefined);
    }

    runFoodAPI(searchTerm: Ingredient) {
        return axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi', {
            "query": searchTerm.name, //getShortenedSearchTerm(searchTerm),
            "dataType": [
                "Sample",
                "SR Legacy",
                "Branded",
                "Survey (FNDDS)",
                "Foundation"
            ]
        }).then((response: any) => {
            //const searchterm = response.data.foodSearchCriteria.query;
            //const description = response.data.foods[0].description
            //const foodCategory = response.data.foods[0].foodCategory
            //const servingSize = response.data.foods[0].servingSize
            //const servingSizeUnit = response.data.foods[0].servingSizeUnit
            const packageWeight = response.data.foods[0].packageWeight
            let kcal = 0;
            let calculatedKCAL = 0;

            for (const foodNutri of response.data.foods[0].foodNutrients) {
                if (foodNutri.unitName == "KCAL" /*&& foodNutri.nutrientName == 'Energy'*/ ){
                    //console.log(foodNutri.nutrientName)
                    //console.log(foodNutri.value)
                    kcal = foodNutri.value //calculated from value per serving size measure
                }
            }

            const pw = packageWeight.split('/')
            for (let i = 0; i < pw.length; i++) {
                const u = pw[i].trim().split(' ')
                if (this.units.includes(u[1].trim().toLowerCase() ) ){
                    //calculatedKCAL = calculateKCAL(searchTerm, kcal, servingSize, servingSizeUnit) + " kcal"
                    calculatedKCAL = this.calculateKCAL(searchTerm, kcal, u[0], u[1])
                }

                if (calculatedKCAL != 0){
                    break;
                }
            }

            return calculatedKCAL

            /*return {
                "searchterm": searchterm,
                "description": description,
                "foodCategory": foodCategory,
                "servingSize": servingSize + " " + servingSizeUnit,
                "ogEnergy": kcal + " kcal",
                "packageWeight": packageWeight,
                "calculatedEnergy": calculatedKCAL
            }*/

            /*
            console.log({
                "searchterm": searchterm,
                "description": description,
                "foodCategory": foodCategory,
                "servingSize": servingSize + " " + servingSizeUnit,
                "ogEnergy": kcal + " kcal",
                "packageWeight": packageWeight,
                "calculatedEnergy": calculatedKCAL + " kcal"
            })
            console.log("----------------------")*/

            //console.log(response.data.foods[0])
        }).catch((a: any) => {
            console.error("error at: " + searchTerm + " is " + a.response)
            console.log("----------------------")
        })
    }

    calculateKCAL(i:Ingredient, kcal:number, servingSize:number|undefined, servingUnit:string|undefined){
        let res:number = kcal;
        if (servingSize != undefined && servingUnit != undefined &&
            this.units.includes(i.measurement) &&
            this.units.includes(servingUnit)){
            const qty = Qty(i.amount + " " + i.measurement)
            const calc = qty.to(servingUnit).scalar / servingSize
            res *= calc;
        }

        return Math.round(res);
    }

}
