import {Recipe} from "../../shared/model/Recipe";
import {Ingredient} from "../../shared/model/Ingredient";
const convert = require('convert-units')

export function separate(r: Recipe) {
  const units = getUnits()

  //console.log(units)

  r.ingredients.forEach((i:Ingredient) => {

    units.forEach( (unit: string) => {
      //https://regex101.com/r/88Ynb0/1
      // separate str by unit
      let regex = new RegExp(String.raw`(?<number>[\d,./]+)\s?(${unit})\s(?<name>.+)`);

      //https://regex101.com/r/Hn57C2/1
      // separate str by number (pieces) and exclude none needed parts
      //let regex2 = new RegExp(String.raw`(?<amount>^\\d+)(?<exclude1>\\s?)(?<exclude2>-\\d*\\s)(?<exclude3>\\s?(\\d+)?)(?<name>.+)`);
      let regex2 = new RegExp(String.raw`(?<amount>^\d+)(?<exclude1>(\s?)-\d*\s)?(?<exclude2>\s?(\d+)?\s?)(?<name>.+)`);

       if(regex.test(i.name)){
         let found = i.name.match(regex)
         i.amount = parseInt(found!.groups!.number)
         i.name = found!.groups!.name
         i.measurement = unit

       }else if(regex2.test(i.name)){
         let found = i.name.match(regex2)

         //let exclude = found!.groups!.exclude1 + found!.groups!.exclude2

         console.log(parseInt(found!.groups!.amount))
         //console.log(exclude)

         i.amount = parseInt(found!.groups!.amount);
         let s = found!.groups!.name.replace(found!.groups!.exclude1, '')
         s.replace(found!.groups!.exclude2, '')

         i.name = s;
         i.measurement = i.amount == 1 ? "piece" : "pieces";
       } else {
         i.amount = 1
         i.measurement = "";
       }
    })
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
  measuresArray += "piece,pieces,tbsp,ounce"

  return measuresArray.split(',')
}


