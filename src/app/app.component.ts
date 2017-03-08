import { NavController } from 'ionic-angular/es2015';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  settingsPage:any = SettingsPage;

  @ViewChild('nav') nav:NavController;


  constructor(platform: Platform, private menuController: MenuController) {
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
  
}
}
