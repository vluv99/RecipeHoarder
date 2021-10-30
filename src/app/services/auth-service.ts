import {Injectable, NgZone} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../../shared/model/User";
import firebase from "firebase/compat";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any; // Save logged in user data

    constructor(
        public firestore: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
    }

    // Sign in with email/password
    signIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                /*this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                });*/
                this.setUserData(result.user!);
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    signUp(email: string, password: string, additionalData: any) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                    //this.SendVerificationMail();

                result.user?.updateProfile({
                    displayName : additionalData.username
                }).then(() => {
                    this.setUserData(result.user!, additionalData);
                })

            }).catch((error) => {
                window.alert(error.message)
            })
    }

    /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    setUserData(fuser: firebase.User, additionalData: any = null) {
        const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${fuser.uid}`);
        const userData: User = {
            uid: fuser.uid,
            email: fuser.email!,
            name: additionalData.name,
            username: fuser.displayName!,
            gender: additionalData.gender,
            birthDate: additionalData.birthDate,
            emailVerified: fuser.emailVerified,
            saved : []
        }
        return userRef.set(userData, {
            merge: true
        })
    }
}
