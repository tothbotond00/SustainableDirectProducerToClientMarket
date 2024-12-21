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
        path: 'example',
        loadChildren: () => import('./page/example/example.module').then(m => m.ExampleModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./page/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./page/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('./page/basket/basket.module').then(m => m.BasketModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./page/order/order.module').then(m => m.OrderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
