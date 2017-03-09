import { AuthService } from '../services/auth';
import { NavController } from 'ionic-angular/es2015';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  settingsPage:any = SettingsPage;

public readonly firebaseApiKey:string = "AIzaSyAyoPs4xhygUUzz4fOSZZka7z4W5qgY8fs";
public readonly firebaseAuthDomain:string = "ionic2-recipe-c0dd5.firebaseapp.com";
public readonly firebaseDatabaseURL:string = "https://ionic2-recipe-c0dd5.firebaseio.com";
public readonly firebaseStorageBucket:string = "ionic2-recipe-c0dd5.appspot.com";
public readonly firebaseMessagingSenderId:string = "104588216188";
public isAuthenticated:boolean = false;


  @ViewChild('nav') nav:NavController;


  constructor(platform: Platform, private menuController: MenuController, private authService: AuthService) {

    firebase.initializeApp({
      apiKey: this.firebaseApiKey,
    authDomain: this.firebaseAuthDomain
    });

    firebase.auth().onAuthStateChanged(
      (user) => {
            if(user){
              this.isAuthenticated = true;
              this.rootPage = TabsPage;
            }
            else
            {
              this.isAuthenticated = false;
              this.rootPage = SigninPage;
            }
      });
 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();
      
    });
  }


public onLoad(page:any):void{
  this.nav.setRoot(page);
  this.menuController.close();
}

public onLogout():void{
  this.authService.logout().then(
              (data) => {
                  console.log('Logout');
              }
          ).catch( 
              error => {
                  console.log(error.message);
              }
          );
  this.menuController.close();          
  this.nav.setRoot(SigninPage);
}
}
