import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnProductComponent } from './component/own-product.component';

const routes: Routes = [{ path: '', component: OwnProductComponent }];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class OwnProductRoutingModule { }
