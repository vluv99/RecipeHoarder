import {Recipe} from "../../shared/model/Recipe";
import {Ingredient} from "../../shared/model/Ingredient";

const convert = require('convert-units')

export function separate(r: Recipe) {
    const units = getUnits()

    //console.log(units)

    r.ingredients.forEach((i: Ingredient) => {
        let processed = false;

        units.forEach((unit: string) => {

            //https://regex101.com/r/2sNpJn/1
            // separate str by unit
            let regex = new RegExp(String.raw`(?<number>[\d,./]+)\s?(${unit}[s]?)\s(?<name>.+)`);

            if (regex.test(i.name)) {
                const found = i.name.match(regex)
                i.amount = parseInt(found!.groups!.number)
                i.name = found!.groups!.name
                i.measurement = unit
                processed = true;
                console.log("regex1 " + i)

            }
        })

        //https://regex101.com/r/Hn57C2/1
        // separate str by number (pieces) and exclude none needed parts
        let regex2 = new RegExp(String.raw`(?<amount>^\d+)(\s?-\s?\d*\s?)?\s?(?<name>.+)`);

        if (!processed && regex2.test(i.name)) {
            const found = i.name.match(regex2)

            console.log(parseInt(found!.groups!.amount))

            i.amount = parseInt(found!.groups!.amount);

            i.name = found!.groups!.name;
            i.measurement = i.amount == 1 ? "piece" : "pieces";
            processed = true;
            console.log("regex2 " + i)
        } else if (!processed) {
            i.amount = 1
            i.measurement = "";
            console.log("no regex " + i)
        }
    })


    return r//Recipe.empty()
}

export function getUnits() {
    //const convert = configureMeasurements(allMeasures);
    /*const measuresList = convert().list()
    let measuresArray: string[] = ["db"]
    //console.log(measuresArray[0]["abbr"])

    measuresList.forEach((m: any) => {
      measuresArray.push(m["abbr"])
    })*/

    let measuresArray = convert().possibilities('mass');
    measuresArray += convert().possibilities('length');
    measuresArray += convert().possibilities('volume');
    //measuresArray += "piece,pieces,tbsp,ounce"

    return measuresArray.split(',')
}


