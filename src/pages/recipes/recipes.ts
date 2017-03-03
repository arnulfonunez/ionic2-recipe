import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

protected onNewRecipe():void{

  this.navCtrl.push(EditRecipePage, {mode: 'New'});

}


}
