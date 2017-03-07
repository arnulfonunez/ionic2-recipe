import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams,ActionSheetController,ActionSheet } from 'ionic-angular';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{

@ViewChild ('theForm') theForm: NgForm;
 //protected theForm: NgForm = null; 
 protected mode: string = 'New';
 protected difficultyLevel: string = "Medium";
 protected diffiCultyLevelOptions: string[] = ['Easy','Medium','Hard'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

ngOnInit(){
  this.mode = this.navParams.get('mode');
}

protected onSubmitRecipe(theForm: NgForm): void{
//console.log(theForm);
//console.log(this.theForm);
//theForm.value.title = "a test";
console.log(theForm);
}

protected onManageIngredients(): void{
  let actionSheet:ActionSheet = this.actionSheetController.create(
    {
       title: 'Manage Ingredients' ,
       buttons:[
         {
           text: 'Add Ingredient',
           handler: () => {
               console.log('Add Ingredient selected');
           }
         },
         {
           text: 'Remove all Ingredients',
           role: 'destructive',
           handler: () => {
             console.log('Remove all ingredients selected');
           }
          },
           {
             text: 'Cancel',
             role: 'cancel'
           }
       ]
    }
  );

  actionSheet.present();

}


}
