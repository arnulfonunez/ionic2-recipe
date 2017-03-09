import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { Utils } from './utils';
import { AuthService } from './auth';

@Injectable()
export class RecipesService{
    private recipeList: Recipe[] = [];
    private readonly baseUrl: string = Utils.firebaseDatabaseURL;

    constructor(private http: Http, private authService:AuthService){}



    public addRecipe(recipe: Recipe): void{
        this.recipeList.push(recipe);
    }

    public addRecipe2(title:string, description:string, difficulty:string, ingredients:Ingredient[]){
        this.recipeList.push(new Recipe(title,description,difficulty,ingredients));
    }

    public getRecipes(): Recipe[]{
        return this.recipeList.slice();
    }

    public updateRecipe(index:number, recipe:Recipe): void{
        this.recipeList[index] = recipe;
    }

    public updateRecipe2(index:number, title:string, description:string,difficulty:string, ingredients: Ingredient[]):void
    {
        this.updateRecipe(index, new Recipe(title,description,difficulty,ingredients));
    }

    public deleteRecipe(index:number):void{
        this.recipeList.splice(index,1);
    }

public storeRecipes(token:string):Observable<Response>{
    let userId: string = this.authService.getActiveUser().uid;
    let url:string = this.baseUrl + '/' + userId + '/' + Utils.firebaseRecipeListJson + '?auth=' + token;
    return this.http.put(url,this.recipeList).map((response:Response) => {return response.json();})
}

public retrieveRecipes(token:string):Observable<any>{ //using Observable of any because that's the return type of do method.
    let userId:string = this.authService.getActiveUser().uid;
    let url: string = this.baseUrl + '/' + userId + '/' + Utils.firebaseRecipeListJson + '?auth=' + token;
    return this.http.get(url).map((response:Response) => {
        return response.json();
    }).do(
        (data) => {
            this.recipeList = data;
        }
    );
}

}


