import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
export class RecipesService{
    private recipeList: Recipe[] = [];

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
}