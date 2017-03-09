import { User } from '../models/user';
//import firebase from 'firebase';
import firebase from 'firebase';

export class AuthService{
    public signup(user:User):firebase.Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
    }

    public login(user:User):firebase.Promise<any>{
        return firebase.auth().signInWithEmailAndPassword(user.email,user.password);
    }

    public logout():firebase.Promise<any>{
        return firebase.auth().signOut();
    }

    public getActiveUser(){
        return firebase.auth().currentUser
    }

}


/*
More about Tokens
Section 7, Lecture 157
The token we use here is a JWT => JSON Web Token. You learn more about this technology in the following article: https://jwt.io/
During the compilation process, Cordova will convert our code such that it actually is not stored in localStorage  
(we don't have that on a mobile device) but in an appropriate other space, preferably a SQLite database
*/