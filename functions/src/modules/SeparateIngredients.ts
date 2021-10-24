import {ImportData, PipelineModule} from "../Pipeline";
//import convert from "convert-units";
import {Ingredient} from "../../../shared/model/Ingredient";

const convert = require('convert-units')
var numQty = require("numeric-quantity");

export class SeparateIngredients implements PipelineModule {
    units = this.getUnits()
    unitRegexes: {unit:string, regex:RegExp}[] = []

    constructor() {
        for (const unit of this.units) {
            //https://regex101.com/r/xukvvW/1
            // separate str by unit
            const regex = new RegExp(String.raw`(?<number>[\d,./]+|[\d]*[\s]?[\u2150-\u215E\u00BC-\u00BE])\s?(.+)?(${unit}[s]?)[\.]?\s(?<name>.+)`);

            //regex.compile()
            this.unitRegexes.push({unit, regex})
        }
    }

    run(imp: ImportData): Promise<void> {
        imp.r.ingredients.forEach((i: Ingredient) => {
            let processed = this.extractUnitMeasurement(i);

            if (!processed) {
                processed = this.extractPieceCount(i);
            }

            if (!processed) {
                i.amount = 1
                i.measurement = "";
                //console.log("no regex " + i)
            }

        })

        return Promise.resolve(undefined);
    }

    extractUnitMeasurement(i:Ingredient):boolean{
        for (const unit of this.unitRegexes) {

            if (unit.regex.test(i.name)) {
                const found = i.name.match(unit.regex)

                //console.log("asdasd"+i.name + " " + JSON.stringify(found));
                if(found && found) {
                    i.amount = this.parseNumber(found!.groups!.number)
                    i.name = found!.groups!.name
                    i.measurement = unit.unit

                    return true;
                }
            }
        }

        return false;
    }

    extractPieceCount(i:Ingredient):boolean{
        //https://regex101.com/r/zkZdv7/1/
        // separate str if it contains number
        const regex2 = new RegExp(String.raw`(?<amount>^[\d\/\\]+)(\s?-\s?\d*\s?)?\s?(?<name>.+)`);

        if (regex2.test(i.name)) {
            const found = i.name.match(regex2)

            console.log("regex piece " + found!.groups!.amount)
            //console.log(this.parseNumber(found!.groups!.amount))

            i.amount = this.parseNumber(found!.groups!.amount);

            i.name = found!.groups!.name;
            i.measurement = i.amount == 1 || i.amount == 0.5 ? "piece" : "pieces";

            return true;
        }

        return false;
    }

    parseNumber(num:string):number{
        let res:number;

        if (num.includes('/')){

            res = numQty(num)
            console.log("eval res: " + res)
        }else if(num.includes('\\')){

            const i = num.replace('\\', '/')
            res =  numQty(i)
        } else if (num.includes(',')){

            res = numQty(num.replace(',', '.'))
        }else {

            res = numQty(num)
        }

        return res
    }

    getUnits() {
        const measuresArray = convert().list('mass')
        measuresArray.concat(convert().list('length'))
        measuresArray.concat(convert().list('volume'))

        let units = measuresArray.map((m: { abbr: { toString: () => any; }; singular:string }) => {
            return [
                m.abbr.toString(),
                m.singular.toLowerCase()
            ]
        })
        units = units.flat();
        units.push("piece");
        units.push("pack");
        units.push("c");
        units.push("cup"); /* !!! why do i have to put this in here? */
        units.push("tbsp");
        units.push("tsp"); /* !!! why do i have to put this in here? */
        units.push("ml"); /* !!! why do i have to put this in here? */
        units.push("tablespoon");
        units.push("teaspoon");
        units.push("pound");

        /*let measuresArray = convert().possibilities('mass');
        measuresArray += convert().possibilities('length');
        measuresArray += convert().possibilities('volume');
        //measuresArray += "piece,pieces,tbsp,ounce"*/

        return units
    }
}
