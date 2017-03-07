import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage implements OnInit{

  public recipeList: Recipe[]  = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipesService: RecipesService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

protected onNewRecipe():void{
  this.navCtrl.push(EditRecipePage, {mode: 'New'});
}

ionViewWillEnter(){
  this.recipeList = this.recipesService.getRecipes();
}


public onLoadRecipe(index:number,recipe:Recipe):void{
}

ngOnInit(){
  
}

}
