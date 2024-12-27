import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';


@NgModule({
  declarations: [
    ProductComponent,
    ReviewDialogComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
