import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from "firebase-admin/firestore";

import {Change, EventContext} from "firebase-functions";
import {firestore} from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;


const app = initializeApp();
const store = getFirestore(app);

export async function updateShoppinglistMeta(change: Change<QueryDocumentSnapshot>, context: EventContext): Promise<void>{
    return addToShoppinglistMeta(change.after,context);
}

export async function addToShoppinglistMeta(change: QueryDocumentSnapshot, context: EventContext): Promise<void> {
    //console.log("triggered onCreate func: ")
    //console.log(change.data())

    const newItem = change.data();

    const collection = store.collection('users/' + context.params.userId + "/shoppinglistMeta")

    const querySnapshot = await collection.where("name", "==", change.data().name).limit(1).get()

    if (querySnapshot.empty) {
        const item = change.data();

        item.score = 2;

        collection.add(item)
    } else {
        //There is already an entry for this, we update that
        const item = querySnapshot.docs[0].data()
        const addDate = item.addDate

        const timeSince = newItem.addDate - addDate

        if('deltaTime' in item){
            item.deltaTime = (item.deltaTime + timeSince)/2;

            if (item.score < 5){
                item.score += 0.1;
            }

        }else {
            item.deltaTime = timeSince;
        }

        item.addDate = newItem.addDate;
        item.nextDate = new firestore.Timestamp(newItem.addDate.seconds + Math.round(item.deltaTime), 0)


        await querySnapshot.docs[0].ref.update(item);
    }
}
