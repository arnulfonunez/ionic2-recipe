
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
protected ingredientList: Ingredient[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService:ShoppingListService
  ,private popoverController:PopoverController
  ,private authService:AuthService
  ,private toastController: ToastController,
  private loadingController: LoadingController) {}

    ngOnInit(){
          }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

protected onAddItem(theForm: NgForm): void{
  let spinner:Loading = this.createLoading();
  //spinner.present();
  this.shoppingListService.addIngredient(new Ingredient(theForm.value.ingredientName,theForm.value.ingredientAmount));
  //After adding the values to the list, then reset the form so the user can enter a new ingredient.
  this.refreshIngredientList();
  theForm.reset();
  //spinner.dismiss();
  
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
  let spinner:Loading = this.createLoading();
  let popover = this.popoverController.create(ShoppingListOptionsPage);
  popover.present({ev:event});
  popover.onDidDismiss(
    (data) =>{
      
      if(!data) return;
        let action:string = data.action;
        if(!action) return;
      
      spinner.present();
       this.authService.getActiveUser().getToken().then(
         (token:string) =>{
                        if(action === 'load'){

                          this.shoppingListService.retrieveShoppingList(token).subscribe(
                            (data: Ingredient[]) =>{

                                  console.log(data);
                                  if(!data){
                                    //this.ingredientList = [];
                                    this.createToast('Unable to retrieve shopping list. ').present();
                                    spinner.dismiss();
                                    return;
                                  }
                                    this.refreshIngredientList();
                                    this.createToast('Retrieve successfull. ').present();
                            },
                            error => {
                              console.log(error.json().error);
                                    let toast:Toast = this.createToast('Unable to retrieve shopping list. ');
                                    toast.present();
                            }

                          );

                            console.log('load action selected');
                          }
                        else if(action === 'store'){
                             this.shoppingListService.storeShoppingList(token)
                             .subscribe(
                               (data) =>{
                                    let toast:Toast = this.createToast('Store successful');
                                    toast.present();
                               },
                               (error) =>{
                                 console.log(error.json().error);
                                     let toast:Toast = this.createToast('Unable to save shopping list. ');
                                    toast.present();
                                }
                             );
                          }
                          spinner.dismiss();
         }
       )
       .catch(
         error =>
         {
           spinner.dismiss();
           let toast: Toast = this.createToast('Unable to perform action. Please try later');
           toast.present();
         }
       );
       //spinner.dismiss();
    }
  );

}


private createToast(message:string, duration:number = 1500, position:string = 'bottom'):Toast{
      return this.toastController.create({message:message,duration:duration,position:position});
}

private createLoading(content:string = 'Please wait...'): Loading{
  return this.loadingController.create({content:content});
}

}