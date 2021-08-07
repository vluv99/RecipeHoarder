import { Injectable } from '@angular/core';
import {Recipe} from "../../model/Recipe";
import {recipes} from "../../scraper/mock_data";

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  db: Recipe[];

  constructor() {
    this.db = recipes;
  }

  search(input:string):Recipe[]{
    let result:Recipe[] = [];
    input = input.toLowerCase();

    this.db.forEach(function (r) {
      var name = r.name.toLowerCase();
      if (name.includes(input)){
        //console.log(name)
        result.push(r);
      }
    })

    return result;
  }

  getById(input:string):Recipe{
    return this.search(input)[0]
  }
}
