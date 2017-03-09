import { List } from 'ionic-angular/es2015';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth';
import { Utils } from './utils';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService{

    private readonly baseUrl:string = Utils.firebaseDatabaseURL;
    constructor(private http: Http, private authService:AuthService){}

    private ingredientList: Ingredient[] = [];

    public addIngredient(ingredient: Ingredient){
        this.ingredientList.push(ingredient);
    }

    public addIngredients(ingredients: Ingredient[])
    {
        this.ingredientList.push(...ingredients); //... means push each element of the array to the Array.
    }

    public getIngredientList(): Ingredient[]{
        return this.ingredientList.slice();
    }

    /*
    public removeIngredient(ingredient:Ingredient): void{
        let ingredientIndex: number = this.ingredientList.findIndex(
            (ingredientEl: Ingredient) => {
                return ingredientEl.name === ingredient.name;
            });
            if(ingredientIndex >= 0){
                this.ingredientList.splice(ingredientIndex,1);
            }
    }
*/
  public removeIngredient(index:number): void{
            if(index >= 0){this.ingredientList.splice(index,1);}
    }

public storeShoppingList(token:string):Observable<Response>{
    let userId:string = this.authService.getActiveUser().uid;
    let url:string = this.baseUrl  + '/' + userId + '/' + Utils.firebaseShoppingListJson + '?auth=' + token;
    return this.http.put(url,this.ingredientList).map((response:Response) =>{return response.json();});
}

public retrieveShoppingList(token:string): Observable<any>{ //using Observable of any because that's the return type of do method.
    let userId: string= this.authService.getActiveUser().uid;
    let url:string = this.baseUrl + '/' + userId + '/' + Utils.firebaseShoppingListJson + '?auth=' + token;
    return this.http.get(url).map(
        (response:Response) =>
        {
            return response.json();
        }
    ).do(
        (data) =>{ //Since we are already in the shopping list service , just grab the list of ingredients and save it on the local List.
            this.ingredientList = data;
        }
    );
}


}