export class Ingredient {
  name: String;
  amount: Number;
  measurement: string;
  constructor(name: String, amount: Number, measurement:string){
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
