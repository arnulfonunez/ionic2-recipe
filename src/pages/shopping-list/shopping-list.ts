import { AuthService } from '../../services/auth';
import { ShoppingListOptionsPage } from './shoppinglist-options/shoppinglist-options';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Toast, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

// protected ingredientName: string = "test";
// protected ingredientAmount: number = 1;
protected ingredientList: Ingredient[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService:ShoppingListService
  ,private popoverController:PopoverController
  ,private authService:AuthService
  ,private toastController: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

protected onAddItem(theForm: NgForm): void{
  this.shoppingListService.addIngredient(new Ingredient(theForm.value.ingredientName,theForm.value.ingredientAmount));
  //After adding the values to the list, then reset the form so the user can enter a new ingredient.
  this.refreshIngredientList();
  theForm.reset();
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
  let popover = this.popoverController.create(ShoppingListOptionsPage);
  popover.present({ev:event});
  popover.onDidDismiss(
    (data) =>{
        let action:string = data.action;
        if(!action) return;

       this.authService.getActiveUser().getToken().then(
         (token:string) =>{
                        if(action === 'load'){
                            console.log('load action selected');
                          }
                        else if(action === 'store'){
                             this.shoppingListService.storeShoppingList(token)
                             .subscribe(
                               () =>{
                                    let toast:Toast = this.toastController.create(
                                      {
                                        message:'Store successful',
                                        duration:1500,
                                        position:'bottom'
                                      }
                                    );
                                    toast.present();
                               },
                               (error) =>{console.log(error);}
                             );
                          }
         }
       )
       .catch(
         error =>
         {
           let toast: Toast = this.toastController.create({message: 'Unable to perform action. Please try later',duration: 1500,position:'bottom'});
           toast.present();
         }
       );

    }
  );

}

}