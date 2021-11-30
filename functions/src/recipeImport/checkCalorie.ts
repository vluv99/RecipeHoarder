import {firestore} from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import {EventContext} from "firebase-functions";
import {Recipe} from "../../../shared/model/Recipe";
import {CalorieCalculator} from "./modules/CalorieCalculator";
import {ImportData} from "./Pipeline";


const calculator = new CalorieCalculator();

export async function checkCalorie(snapshot: QueryDocumentSnapshot, context: EventContext): Promise<void> {

    const data: Recipe = snapshot.data() as Recipe;

    if(data.calories == null || data.calories == 0){
        await calculator.run(new ImportData(data,data.url,null!));
    }

    await snapshot.ref.update(data);
}
