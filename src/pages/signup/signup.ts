import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

onSignup(myForm:NgForm):void{
let user: User = new User(myForm.value.email,myForm.value.userName, myForm.value.password);

}

}