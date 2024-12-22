import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './component/recipe-list.component';

const routes: Routes = [{ path: '', component: RecipeListComponent }];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class RecipeListRoutingModule { }
