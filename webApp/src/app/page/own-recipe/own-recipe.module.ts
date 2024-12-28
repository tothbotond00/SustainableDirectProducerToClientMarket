import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnRecipeComponent } from './component/own-recipe.component';
import { OwnRecipeRoutingModule } from './own-recipe-routing.module';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';


@NgModule({
  declarations: [
    OwnRecipeComponent,
    RecipeDialogComponent
  ],
  imports: [
    CommonModule,
    OwnRecipeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OwnRecipeModule { }
