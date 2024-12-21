import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnProductComponent } from './component/own-product.component';
import { OwnProductRoutingModule } from './own-product-routing.module';


@NgModule({
  declarations: [
    OwnProductComponent
  ],
  imports: [
    CommonModule,
    OwnProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OwnProductModule { }
