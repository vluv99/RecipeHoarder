export class Ingredient {
  name: string;
  amount: Number;
  measurement: string;
  constructor(name: string, amount: Number, measurement:string){
    this.name = name;
    this.amount = amount;
    this.measurement = measurement;
  }

  get Measurement(){
    return Measurement;
  }
}

export enum Measurement {
  KG = "kg",
  DKG = "dkg",
  G = "g",
}
