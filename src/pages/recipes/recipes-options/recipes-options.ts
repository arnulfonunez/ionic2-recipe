import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'recipes-options-page',
    template:`
        <ion-grid text-center>

        <ion-row>
            <ion-col>
                <h3>Store & Load</h3>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <button ion-button outline (click)="onAction('load')">Load Recipes</button>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <button ion-button outline (click)="onAction('store')">Store Recipes</button>
            </ion-col>
        </ion-row>
        </ion-grid>
    `
})

export class RecipesOptionsPage{
    constructor(private viewController: ViewController){}
    protected onAction(action:string):void{
        this.viewController.dismiss({action: action});
    }
}