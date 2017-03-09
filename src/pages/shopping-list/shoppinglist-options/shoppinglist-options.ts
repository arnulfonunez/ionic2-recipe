import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-shoppinglist-options',
    template:`
        <ion-grid text-center>
        <ion-row>
            <ion-col><h3>Store & Load</h3></ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <button ion-button outline (click)="onAction('load')">Load List</button>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <button ion-button outline (click)="onAction('store')">Save List</button>
            </ion-col>
        </ion-row>

        </ion-grid>
    `
})
export class ShoppingListOptionsPage{

    constructor(private viewController: ViewController){}

protected onAction(action:string):void{
    this.viewController.dismiss({action:action});
}

}