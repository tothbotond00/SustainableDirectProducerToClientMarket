import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './component/recipe-list.component';
import { RecipeListRoutingModule } from './recipe-list-routing.module';


@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    RecipeListRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeListModule { }
