import {Recipe} from "../../shared/model/Recipe";
import {Ingredient} from "../../shared/model/Ingredient";
const convert = require('convert-units')

export function separate(r: Recipe) {
  const units = getUnits()
  //const regex = /\d+/g;

  //console.log(units)

  r.ingredients.forEach((i:Ingredient) => {
    //console.log(i.name)

    let res:any[] = []

    units.forEach( (unit: string) => {
       if(i.name.includes(unit)){
         res = i.name.split(unit)

         i.amount = parseInt(res[0])
         i.measurement = unit
         i.name = res[1]
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
  measuresArray += "db,tbsp"

  return measuresArray.split(',')
}


