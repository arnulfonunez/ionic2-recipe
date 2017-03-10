import { Injectable } from '@angular/core';
import {LoadingController,Loading,Toast,ToastController, ActionSheet, ActionSheetController, Alert, AlertController} from 'ionic-angular';


@Injectable()
export class Utils{

private alternativeBackgroundToggle:boolean=false;


constructor(private toastController:ToastController, 
private actionsheetController:ActionSheetController, 
private alertController:AlertController,
private loadingController:LoadingController){}

    public static isEmpty(str:String): boolean{
        return (!str || str.trim().length === 0);
    }

public static readonly firebaseApiKey:string = "AIzaSyAyoPs4xhygUUzz4fOSZZka7z4W5qgY8fs";
public static readonly firebaseAuthDomain:string = "ionic2-recipe-c0dd5.firebaseapp.com";
public static readonly firebaseDatabaseURL:string = "https://ionic2-recipe-c0dd5.firebaseio.com";
public static readonly firebaseStorageBucket:string = "ionic2-recipe-c0dd5.appspot.com";
public static readonly firebaseMessagingSenderId:string = "104588216188";
public static readonly firebaseShoppingListJson:string = "shoppinglist.json";
public static readonly firebaseRecipeListJson:string = "recipeList.json";



public createToast(message:string, duration: number = 1500,position: string = 'botton' ): Toast{
  let toast: Toast =  this.toastController.create({
    message: message,
    duration: duration,
    position: position
  });
  return toast;
}

public createLoading(content:string = 'Please wait...'): Loading{
  return this.loadingController.create({content:content});
}

public setAlternativeBackgroundToggle(toggle:boolean):void{
  this.alternativeBackgroundToggle = toggle;
}

public getAlternativeBackgroundToggle():boolean{
  return this.alternativeBackgroundToggle;
  }

}