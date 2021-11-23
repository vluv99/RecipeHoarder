export class Ingredient {
    public id: string | undefined;
  name: string;
  amount: number;
  measurement: string;
  constructor(name: string, amount: number, measurement:string){
    this.name = name;
    this.amount = amount;
    this.measurement = measurement;
  }

  toString(){
      return this.amount + " " + this.measurement + " " + this.name;
  }

}
