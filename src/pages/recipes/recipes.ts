import { AuthService } from '../../services/auth';
import { RecipesOptionsPage } from './recipes-options/recipes-options';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Component, OnInit } from '@angular/core';
import {Loading,LoadingController,Toast,ToastController,PopoverController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage implements OnInit{

  public recipeList: Recipe[]  = [];
  private spinner:Loading = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipesService: RecipesService,
  private popoverController: PopoverController,
  private loadingController: LoadingController,
  private toastController: ToastController,
  private authService:AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

protected onNewRecipe():void{
  this.navCtrl.push(EditRecipePage, {mode: 'New'});
}

ionViewWillEnter(){
  this.refreshRecipes();
}

protected refreshRecipes():void{
  this.recipeList = this.recipesService.getRecipes();
}

public onLoadRecipe(indexPar:number,recipePar:Recipe):void{
  this.navCtrl.push(RecipePage,{recipeIndex: indexPar, selectedRecipe: recipePar})
}

ngOnInit(){
  
}

onShowOptions($event):void{
  this.spinner = this.createLoading();
  let popover = this.popoverController.create(RecipesOptionsPage);
  popover.present({ev:event});
  popover.onDidDismiss(
       (data) =>{
                  if(!data) return;
                  let action:string = data.action;
                  if(!action) return;
                  this.spinner.present();
                  this.authService.getActiveUser().getToken()
                  .then(
                    (token:string) =>{
                      if(action === 'load'){
                        this.retrieveRecipes(token);
                      }
                      else if(action === 'store'){

                      }
                      else{
                        this.spinner.dismiss();
                      }
                    }

                  )
                  .catch(
                    error =>{
                      this.spinner.dismiss();
                      this.createToast(error.message).present();
                    }
                  )
        }
  );



}


private retrieveRecipes(token:string):void{
  this.recipesService.retrieveRecipes(token).subscribe(); //continue here
}

private storeRecipes(token:string):void{
  this.recipesService.retrieveRecipes(token).subscribe(); //continue here
}


private createToast(message:string, duration:number = 1500, position:string = 'bottom'):Toast{
      return this.toastController.create({message:message,duration:duration,position:position});
}

private createLoading(content:string = 'Please wait...'): Loading{
  return this.loadingController.create({content:content});
}


}
