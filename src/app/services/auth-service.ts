import {Injectable, NgZone} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../../shared/model/User";
import firebase from 'firebase/compat/app';



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
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
            } else {
                //alert("Coudn't ...")
            }
        })
    }

    // Sign in with email/password
    logIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.setUserData(result.user!);
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    register(email: string, password: string, additionalData: any) {
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

    // Sign in with Google
    googleAuth() {
        return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    authLogin(provider: firebase.auth.GoogleAuthProvider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.setUserData(result.user!);
            }).catch((error) => {
                window.alert(error)
            })
    }

    /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    setUserData(fuser: firebase.User, additionalData: any = null) {
        const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${fuser.uid}`);
        const userData:any = {
            uid: fuser.uid,
            email: fuser.email!,
            //name: additionalData.name,
            username: fuser.displayName!,
            //gender: additionalData.gender,
            //birthDate: additionalData.birthDate,
            emailVerified: fuser.emailVerified,
            saved : []
        }

        if (additionalData){
            userData.name = additionalData.name
            userData.gender = additionalData.gender
            userData.birthDate = additionalData.birthDate
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    // Sign out
    logOut() {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['login']);
        }).catch(() => {
            alert("Couldn't log out!")
        })
    }
}
