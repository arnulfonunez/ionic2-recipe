import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { RecipesService } from '../../services/recipes';
import { Utils } from '../../services/utils';
import { NgForm } from '@angular/forms/src/directives';
import { Component, Input, OnInit } from '@angular/core';
import {Toast,ToastController, ActionSheet, ActionSheetController, Alert, AlertController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{

//@ViewChild ('theForm') theForm: NgForm;
 //protected theForm: NgForm = null; 
 protected mode: string = 'New';
 protected difficultyLevel: string = "Medium";
 protected diffiCultyLevelOptions: string[] = ['Easy','Medium','Hard'];
 protected ingredientList: Ingredient[]= [];
 protected selectedRecipeIndex: number = -1;
 @Input() protected  recipe:Recipe = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController: ActionSheetController,
  private alertController: AlertController, private toastController: ToastController, private utils: Utils, private recipesService: RecipesService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

ngOnInit(){
  this.mode = this.navParams.get('mode');
  
  if(this.mode.trim() === 'Edit'){
    this.selectedRecipeIndex = this.navParams.get('selectedRecipeIndex');
    this.recipe = this.navParams.get('selectedRecipe');
    this.ingredientList = this.recipe.ingredients;
  }
  else
  {
    this.selectedRecipeIndex = -1;
    this.recipe = new Recipe('','',this.difficultyLevel,[]);
  }
}

protected onSubmitRecipe(theForm: NgForm): void{
//console.log(theForm);
//console.log(this.theForm);
//theForm.value.title = "a test";
//Since the ingredient is only adding a name and not the amount, we can use the map function to convert the name string into an object. 
//Example start
    //let ingredientsTest: Ingredient[] = [];
    //let ingredientListTest: string[] = ['test1','test2'];
    //ingredientsTest = ingredientListTest.map(name => {return {name: name, amount:1} });
//Example end

//let frmValue:any = theForm.value;

let recipeTemp: Recipe = new Recipe(this.recipe.title,this.recipe.description,this.recipe.difficulty,this.ingredientList);

if(this.mode.trim() === 'New'){
  this.recipesService.addRecipe(recipeTemp);
}
else if(this.mode.trim() === 'Edit'){
  this.recipesService.updateRecipe(this.selectedRecipeIndex,recipeTemp);
}

//theForm.reset();
this.navCtrl.popToRoot();
console.log(theForm);
}

private actionSheet:ActionSheet= null;

protected onManageIngredients(): void{
  this.actionSheet = this.actionSheetController.create(
    {
       title: 'Manage Ingredients' ,
       buttons:[
         {
           text: 'Add Ingredient',
           handler: () => {
               console.log('Add ingredient selected');
               this.createNewIngredientAlert().present();
           }
         },
         {
           text: 'Remove all Ingredients',
           role: 'destructive',
           handler: () => {
             this.createRemoveAllIngredientsAlert().present();
             console.log('Remove all ingredients selected');
             return false;
           }
          },
           {
             text: 'Cancel',
             role: 'cancel'
           }
       ]
    }
  );
  this.actionSheet.present();
}

private createNewIngredientAlert(): Alert{
  let newIngredientAlert:Alert = this.alertController.create(
    {
      title: 'Add Ingredient',
      inputs:[
        {
          name:'alertIngredientName',
          placeholder:'Ingredient Name'
        },
        {
          name:'ingredientAmount',
          placeholder:'Amount',
          type:'number'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          role:'cancel'
        }
        ,
        {
          text: 'Add',
          handler: data => {
            if(Utils.isEmpty(data.alertIngredientName) || Utils.isEmpty(data.ingredientAmount)){
                console.log('The alert ingredient name or amount is empty');
                this.utils.createToast('Please enter valid value!',1500).present();
                return false;
            }
            this.ingredientList.push( new Ingredient(data.alertIngredientName,data.ingredientAmount));      
            this.utils.createToast('Ingredient has been added',1000).present();      
          }
        }
        ]
    }
  );
  return newIngredientAlert;
}

private createRemoveAllIngredientsAlert(): Alert{
  let removeAllIngredientAlert = this.alertController.create(
    {
      title:'Delete Ingredients',
      message: 'Are you sure that you want to remove all ingredients?',
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
            this.ingredientList = [];
            this.actionSheet.dismiss();
            this.utils.createToast('All ingredients have been removed',1500).present();
          }
        }
      ]

    }
  );
  return removeAllIngredientAlert;
}

}
//Toasts are little messages that disappear after a coupple of seconds.