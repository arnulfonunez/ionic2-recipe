import { Utils } from '../../services/utils';

import { LoadingController } from 'ionic-angular/components/loading/loading';
import { AuthService } from '../../services/auth';
import { ShoppingListOptionsPage } from './shoppinglist-options/shoppinglist-options';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import {Loading, NavController, NavParams, PopoverController, Toast, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit{

// protected ingredientName: string = "test";
// protected ingredientAmount: number = 1;
private spinner:Loading = null;
protected ingredientList: Ingredient[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService:ShoppingListService
  ,private popoverController:PopoverController
  ,private authService:AuthService
  ,private toastController: ToastController,
  private loadingController: LoadingController,
  private utils:Utils) {}

    ngOnInit(){
          }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

protected onAddItem(theForm: NgForm): void{
//  this.spinner = this.createLoading();
//  this.spinner.present();
  this.shoppingListService.addIngredient(new Ingredient(theForm.value.ingredientName,theForm.value.ingredientAmount));
  //After adding the values to the list, then reset the form so the user can enter a new ingredient.
  this.refreshIngredientList();
  theForm.reset();
  //this.spinner.dismiss();
}

ionViewWillEnter(){
  this.refreshIngredientList();
}

private refreshIngredientList(){
  this.ingredientList = this.shoppingListService.getIngredientList();
}

protected onDeleteIngredient(ingredientIndex: number): void{
  this.shoppingListService.removeIngredient(ingredientIndex);
  this.refreshIngredientList();
}

protected onShowOptions(event):void{
  this.spinner = this.utils.createLoading();
  let popover = this.popoverController.create(ShoppingListOptionsPage);
  popover.present({ev:event});
  popover.onDidDismiss(
    (data) =>{
      
      if(!data) return;
        let action:string = data.action;
        if(!action) return;
      
      this.spinner.present();
       this.authService.getActiveUser().getToken().then(
         (token:string) =>{
                        if(action === 'load'){
                            this.retrieveShoppingList(token);
                            console.log('load action selected');
                          }
                        else if(action === 'store'){
                             this.storeShoppingList(token);
                          }
                          else{
                            this.spinner.dismiss();
                          }
         }
       ).catch(
         error =>
         {
           this.spinner.dismiss();
           this.utils.createToast('Unable to perform action. Please try later').present();
         }
       );
       //spinner.dismiss();
    }
  );

}

private retrieveShoppingList(token:string):void{
this.shoppingListService.retrieveShoppingList(token).subscribe(
                            (data: Ingredient[]) =>{
                                  //console.log(data);
                                  if(!data){
                                    this.ingredientList = [];
                                    this.utils.createToast('Unable to retrieve shopping list. ').present();
                                    this.spinner.dismiss();
                                    return;
                                  }
                                    this.refreshIngredientList();
                                    this.spinner.dismiss();
                                    this.utils.createToast('Retrieve successfull. ').present();
                            },
                            error => {
                              console.log(error.json().error);
                                this.spinner.dismiss();
                                    this.utils.createToast('Unable to retrieve shopping list. ').present();
                            }

                          );
}

private storeShoppingList(token:string):void{
this.shoppingListService.storeShoppingList(token)
                             .subscribe(
                               (data) =>{
                                 this.spinner.dismiss();
                                    this.utils.createToast('Store successful').present();
                               },
                               (error) =>{
                                 console.log(error.json().error);
                                 this.spinner.dismiss();
                                     this.utils.createToast('Unable to save shopping list.').present();
                                }
                             );
                          }
}