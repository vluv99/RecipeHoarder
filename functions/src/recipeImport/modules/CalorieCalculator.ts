import {ImportData, PipelineModule} from "../Pipeline";

import Qty from 'js-quantities';
import {Ingredient} from "../../../../shared/model/Ingredient";
import axios from "axios";
import {UnitConverter} from "../../utils/unitConverter";
//import {elementAt} from "rxjs";

export class CalorieCalculator implements PipelineModule {
    units: string[] = [];
    cats = ["mass", "volume", "length"];

    async run(imp: ImportData): Promise<void> {
        if (imp.r.calories == null) {
            // get units array
            for (const cat of this.cats) {
                for (const unit of Qty.getUnits(cat)) {
                    this.units = [...this.units, ...Qty.getAliases(unit)];
                }
            }

            //console.group("Starting calorie search for: " + imp.r.name)

            let calculatedKCAL = 0;
            let calculatedIngredients = 0;
            const ings = imp.r.ingredients;

            await Promise.all(ings.map(async ing=>{

                const res = await this.runFoodAPI(ing);
                console.log(ing.toString() + "\t\t Energy: " + res + "\n-----------------------------");
                if (res != undefined && res != 0) {
                    calculatedIngredients++;
                    calculatedKCAL += res;
                }

            }));

            console.log("\nFound: " + calculatedIngredients + "/" + imp.r.ingredients.length+"\n#########################################")

            if (imp.r.ingredients.length * 0.8 <= calculatedIngredients){
                imp.r.calories = calculatedKCAL;
            }
            else{
                imp.r.calories = null;
            }
            if(isNaN(imp.r.calories ?? 0))
                console.log("Oh noooo");

        }

        return Promise.resolve(undefined);
    }

    runFoodAPI(searchTerm: Ingredient) {
        return axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=c7aljWCqn0i0qJAaH6hcunC6l6QcJ2F80f3Yv7zi', {
            "query": searchTerm.name, //getShortenedSearchTerm(searchTerm),
            "dataType": [
                "SR Legacy",
                "Branded",
                "Survey (FNDDS)",
                "Foundation"
            ]
        }).then((response: any) => {

            return this.parseResponse(response.data,searchTerm)

        })/*.catch((a: any) => {
            console.error("error at: " + searchTerm + " is " + a)
            console.log("----------------------")
        })*/
    }

    parseResponse(data:any, searchTerm: Ingredient): number | null{

        let kcal = 0;

        for (const foodNutri of data.foods[0].foodNutrients) {
            if (foodNutri.unitName == "KCAL" /*&& foodNutri.nutrientName == 'Energy'*/ ){
                kcal = foodNutri.value //calculated from value per serving size measure
            }
        }

        //console.log("USDA: For: " + searchTerm.toString() + " \t Found:" + data.foods[0].description + "\t\t Energy: " + kcal)

        let packageWeight = ["100", "g"];
        if("packageWeight" in data.foods[0]){
            const pw = data.foods[0].packageWeight
            packageWeight = pw.split('/')

            for (let i = 0; i < packageWeight.length; i++) {
                const u = packageWeight[i].trim().split(' ')
                if (this.units.includes(u[1].trim().toLowerCase())) {
                    packageWeight = u;
                    break
                }
            }
        }
        const calculatedKCAL = this.calculateKCAL(searchTerm, kcal, Number(packageWeight[0]), packageWeight[1])

        return calculatedKCAL
    }

    calculateKCAL(i:Ingredient, kcal:number, servingSize:number|undefined, servingUnit:string|undefined){

        if (servingSize != undefined && servingUnit != undefined){
            const res = UnitConverter.convert(i.amount.valueOf(), i.measurement,servingUnit);

            if(res == null){
                return null;
            }

            const calc = (res / servingSize)*kcal

            return Math.round(calc);
        }
        return null;

    }

}
