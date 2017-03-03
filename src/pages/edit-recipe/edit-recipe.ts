import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{

 protected mode: string = 'New';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

ngOnInit(){
  this.mode = this.navParams.get('mode');
}
}
