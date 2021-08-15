export class Ingredient {
  name: String;
  amount: Number;
  measurement: Measurement;
  constructor(name: String, amount: Number, measurement:Measurement){
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
