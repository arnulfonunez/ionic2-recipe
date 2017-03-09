export class Utils{

    public static isEmpty(str:String): boolean{
        return (!str || str.trim().length === 0);
    }

public static readonly firebaseApiKey:string = "AIzaSyAyoPs4xhygUUzz4fOSZZka7z4W5qgY8fs";
public static readonly firebaseAuthDomain:string = "ionic2-recipe-c0dd5.firebaseapp.com";
public static readonly firebaseDatabaseURL:string = "https://ionic2-recipe-c0dd5.firebaseio.com";
public static readonly firebaseStorageBucket:string = "ionic2-recipe-c0dd5.appspot.com";
public static readonly firebaseMessagingSenderId:string = "104588216188";
public static readonly firebaseShoppingListJson:string = "shoppinglist.json";
public static readonly firebaseRecipeListJson:string = "recipeList.json";



}