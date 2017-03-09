import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import {AlertController,LoadingController,Alert, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, 
  private alertController: AlertController, private loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

public onLogin(myForm:NgForm): void{

    let spinner = this.loadingController.create({content:'Verifying...'});
    spinner.present();
    let user: User = new User(myForm.value.email,myForm.value.email, myForm.value.password);
    this.authService.login(user).
    then(
      data => {
        spinner.dismiss();
        console.log('Login successfull.');
      }
    ).
    catch(
      error => {
        spinner.dismiss();
        let alert:Alert = this.alertController.create({
          title:'Login failed',
          message:error.message,
          buttons:['OK']
        });
        alert.present();
      }
    );
}
}