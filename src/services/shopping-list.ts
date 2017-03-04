import { Ingredient } from '../models/ingredient';


export class ShoppingListService{
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


}