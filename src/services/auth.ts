import { User } from '../models/user';
import firebase from 'firebase';

export class AuthService{
    public signup(user:User):firebase.Promise<any>{
        return firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
    }
}