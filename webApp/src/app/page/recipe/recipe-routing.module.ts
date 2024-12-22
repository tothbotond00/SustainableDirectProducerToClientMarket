import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './component/recipe.component';

const routes: Routes = [{ path: '', component: RecipeComponent }];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class RecipeRoutingModule { }
