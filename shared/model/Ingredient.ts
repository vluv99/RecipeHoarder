export class Ingredient {
    public id: string | undefined;
  name: string;
  amount: Number;
  measurement: string;
  constructor(name: string, amount: Number, measurement:string){
    this.name = name;
    this.amount = amount;
    this.measurement = measurement;
  }

}
