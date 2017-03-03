import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{

//@ViewChild('theForm') theForm: NgForm;
 //protected theForm: NgForm = null; 
 protected mode: string = 'New';
 protected diffiCultyLevelOptions: string[] = ['Easy','Medium','Hard'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

ngOnInit(){
  this.mode = this.navParams.get('mode');
}

protected onSubmitRecipe(theForm: NgForm): void{
//console.log(theForm);
//console.log(this.theForm);
theForm.value.title = "a test";
}

}
