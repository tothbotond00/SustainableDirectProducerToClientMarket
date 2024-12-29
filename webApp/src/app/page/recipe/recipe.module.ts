import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './component/recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';


@NgModule({
  declarations: [
    RecipeComponent,
    IngredientDialogComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
