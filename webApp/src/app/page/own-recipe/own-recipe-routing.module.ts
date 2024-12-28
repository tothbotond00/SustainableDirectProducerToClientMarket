import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnRecipeComponent } from './component/own-recipe.component';

const routes: Routes = [{ path: '', component: OwnRecipeComponent }];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class OwnRecipeRoutingModule { }
