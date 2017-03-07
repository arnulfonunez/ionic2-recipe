import { RecipesService } from '../services/recipes';
import { Utils } from '../services/utils';
import { ShoppingListService } from '../services/shopping-list';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RecipePage } from '../pages/recipe/recipe.ts';
import { RecipesPage } from '../pages/recipes/recipes.ts';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list.ts';
import { TabsPage } from '../pages/tabs/tabs.ts';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe.ts';

@NgModule({
  declarations: [
    MyApp    ,
    RecipePage    ,
    RecipesPage    ,
    ShoppingListPage    ,
    TabsPage,
    EditRecipePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    ,
    EditRecipePage    ,
    RecipePage    ,
    RecipesPage    ,
    ShoppingListPage    ,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}
  ,ShoppingListService, Utils, RecipesService]
})
export class AppModule {}
