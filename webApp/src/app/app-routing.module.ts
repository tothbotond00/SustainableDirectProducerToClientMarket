import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./page/start/start.module').then(m => m.StartModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./page/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'user/:id',
      loadChildren: () => import('./page/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'product/:id',
        loadChildren: () => import('./page/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('./page/basket/basket.module').then(m => m.BasketModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./page/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./page/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'own-products',
        loadChildren: () => import('./page/own-products/own-product.module').then(m => m.OwnProductModule)
      },
      {
        path: 'recipe/:id',
        loadChildren: () => import('./page/recipe/recipe.module').then(m => m.RecipeModule)
      },
      {
        path: 'recipe-list',
        loadChildren: () => import('./page/recipe-list/recipe-list.module').then(m => m.RecipeListModule)
      },
      {
        path: 'own-recipe',
        loadChildren: () => import('./page/own-recipe/own-recipe.module').then(m => m.OwnRecipeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
