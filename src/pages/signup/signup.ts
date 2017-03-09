import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import {
    Alert,
    AlertController,
    LoadingController,
    NavController,
    NavParams

} from 'ionic-angular';

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
  spinner.dismiss();
  /* this part is not needed with firebase because firebase will login the user is signup is successful.
  let toast: Toast = this.toastController.create({
    message: 'Signup successful. Please login',
    duration: 1500,
    position:'bottom'
  });
  toast.present();
  this.navCtrl.setRoot(SigninPage);
  */
  

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