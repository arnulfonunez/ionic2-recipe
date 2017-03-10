import { Utils } from '../../services/utils';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,Toast,ToastController, Alert, AlertController, } from 'ionic-angular';

//import {Toast,ToastController, ActionSheet, ActionSheetController, Alert, AlertController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit{
  public recipe:Recipe = null;
  public selectedRecipeIndex: number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private toastController:ToastController,
  private alertController: AlertController, private recipesService: RecipesService,
  private shoppingListService: ShoppingListService,
  private utils: Utils) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

ionViewWillEnter(){
  console.log( this.navParams.data);
}

ngOnInit(){
  this.recipe = this.navParams.get('selectedRecipe');
  this.selectedRecipeIndex = this.navParams.get('recipeIndex');
}


public onDeleteRecipe():void{
  this.createDeleteRecipeAlert().present();
}


private createDeleteRecipeAlert(): Alert{
  let alert = this.alertController.create(
    {
      title:'Delete Recipe',
      message: 'Are you sure that you want delete the recipe?',
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        }
        ,
        {
          text:'OK',
          role:'destructive',
          handler: ()=> {
            this.recipesService.deleteRecipe(this.selectedRecipeIndex);
            this.utils.createToast('Recipe deleted',1500).present();
            this.navCtrl.popToRoot();
          }
        }
      ]
    }
  );
  return alert;
}

public onAddIngredients():void{
  this.shoppingListService.addIngredients(this.recipe.ingredients);
}

public onEditRecipe():void{
this.navCtrl.push(EditRecipePage,{mode:'Edit',selectedRecipe:this.recipe, selectedRecipeIndex:this.selectedRecipeIndex});
}


}