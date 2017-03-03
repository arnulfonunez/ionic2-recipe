import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

// protected ingredientName: string = "test";
// protected ingredientAmount: number = 1;
protected ingredientList: Ingredient[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService:ShoppingListService) {}

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

}