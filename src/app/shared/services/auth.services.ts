import { Injectable, NgZone } from '@angular/core';
import { User } from "../interfaces/user";
// import { User } from  'firebase';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
// import { AngularFireAuth } from "@angular/fire/auth";
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFirestoreDocument } from '@angular/fire';
import { Router } from "@angular/router";
import { DataService } from './data.services';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    // public afs: AngularFirestore,   // Inject Firestore service
    // public afAuth: AngularFireAuth, // Inject Firebase auth service
    private dataService:DataService,
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return firebase.auth().sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
    // return true;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      this.getUserInformation();
      this.saveLocalStorageUser(result.user);

      this.dataService.getUserByEmail(result.user.email)
      .subscribe((user)=> { 
        console.log('login', user);
        if(!!user[0]) {
          this.setUserId(user[0].userId)
          this.ngZone.run(() => {
            this.router.navigate(['profile']);
          })
        } else {
           this.ngZone.run(() => {
            this.router.navigate(['add-user']);
          })
        }

        

      })
      
      // this.SetUserData(result.user);
    }).catch((error) => {
      console.log(error)
      // window.alert(error)
    })
  }

  setUserId(userId) {
    localStorage.setItem('userId', userId);  
  }
  saveLocalStorageUser(user) {
     if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }

  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    // const userRef: any = this.afs.doc(`users/${user.uid}`);
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   emailVerified: user.emailVerified
    // }
    // return userRef.set(userData, {
    //   merge: true
    // })
  }
  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Sign out 
  SignOut() {
    return firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
  removeCache() {
     localStorage.removeItem('user');
     localStorage.removeItem('userId');
  }

  getUserInformation() {
    console.log('getUserInformation');
  }
}