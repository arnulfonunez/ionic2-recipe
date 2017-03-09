import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import {Alert,AlertController, NavController, NavParams,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private authService:AuthService,
  private loadingController:LoadingController, private alertController:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

onSignup(myForm:NgForm):void{
  let spinner = this.loadingController.create({
    content:'Please wait...'
  });

spinner.present();

let user: User = new User(myForm.value.email,myForm.value.userName, myForm.value.password);

this.authService.signup(user).then( data =>{
  console.log(data);
  spinner.dismiss();
}).catch(error =>{

  let signupFailAlert: Alert = this.alertController.create({
    title:'Signup',
    message: error.message,
    buttons:["OK"]
  });
  spinner.dismiss();
  signupFailAlert.present();
  console.log(error);

});

}

}