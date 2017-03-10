import { Utils } from '../../services/utils';
import { Component } from '@angular/core';
import { NavController, NavParams, Toggle } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils:Utils) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


protected getAltBackgroundToggle():boolean{
return this.utils.getAlternativeBackgroundToggle();
}

protected onToggle(toggle: Toggle): void{
    this.utils.setAlternativeBackgroundToggle(toggle.checked);
}

}
