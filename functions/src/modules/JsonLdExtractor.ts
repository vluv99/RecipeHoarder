import {ImportData, PipelineModule} from "../Pipeline";
//import {parse} from "tldts";
import {Recipe} from "../../../shared/model/Recipe";
import * as moment from "moment";
import {Ingredient, Measurement} from "../../../shared/model/Ingredient";
import {Steps} from "../../../shared/model/Steps";


export class JsonLdExtractor implements PipelineModule {

    run(imp: ImportData):Promise<void> {
        //const host = parse(imp._url).domainWithoutSuffix

        // select the script tag
        const ldJsonArray = imp.$!('script[type="application/ld+json"]');

        let recipeLD: any;

        ldJsonArray.each( function (i, elem) {
            const selected = imp.$!(this).html();

            if (typeof selected === "string") {   //
                var ldData = JSON.parse(selected);
            }

            if (Array.isArray(ldData)) {
                ldData.forEach((element: any) => {
                    if (element["@type"] == "Recipe") {
                        recipeLD = element;
                    }
                });
            } else {
                if (ldData["@type"] == "Recipe") {
                    recipeLD = ldData;
                }
            }
        })

        this.getDataFromLD(recipeLD, imp.r);

        return Promise.resolve();
    }

    getDataFromLD(ldData: any, r:Recipe): void{
        //Firebase is going to add the ID, so we're leaving it empty
        r.name = ldData["name"];


        if (ldData["image"]){
            const img = ldData["image"]

            if (Array.isArray(img)){

                /*if (typeof img[0] === "string"){
                    r.image = img[0]
                }else*/
                if ('url' in img[0]){
                    r.image = img[0].url
                }
            } else {
                r.image = ldData["image"].url;
            }
        } else {
            r.image = ldData["video"]?.thumbnailUrl ?? null;
        }

        //url is already in
        r.description = ldData["description"]

        const time = moment.duration(ldData["totalTime"]).asMinutes();
        r.totalCookTime = time;

        let cal = ldData["nutrition"]?.calories;
        if (cal != null) {
            //only keep the numbers
            cal = cal.replace("calories", "");
        }

        r.calories = parseInt(cal);

        if (ldData["recipeIngredient"]) {
            ldData["recipeIngredient"].forEach((ing: any) => {
                const n = ing;
                r?.ingredients.push(new Ingredient(n, 1, Measurement.KG));
            });

            for (const i of r.ingredients) {
                i.name = i.name.replace(/<[^>]+>/g, '');
                //console.log(i.name)
            }
        }

        let num = 1;
        if (ldData["recipeInstructions"]) {

            const insts:any[] | string = ldData["recipeInstructions"]

            if (Array.isArray(ldData["recipeInstructions"]) && typeof insts!== "string") {
                insts.forEach((st: any) => {
                    let res = "";

                    //removes unnecessary HTML elements from the text
                    if (typeof st === "string") {
                        res = st;
                    } else if ('text' in st) {
                        res = st.text;
                    }
                    //res = res.replace(/<[^>]+>/g, '');

                    r?.steps.push(new Steps(num, res))
                    num++;
                })

            } else if (typeof insts === "string"){
                const a = insts.split("&nbsp;");

                a.forEach((e:string) => {
                    r?.steps.push(new Steps(num, e))
                    num++;
                })
            }

            for (const step of r.steps) {
                step.step = step.step.replace(/<[^>]+>/g, '');
                //console.log(step.step)
            }
        }
    }
}
