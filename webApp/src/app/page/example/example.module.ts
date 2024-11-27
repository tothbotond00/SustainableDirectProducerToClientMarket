import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleComponent } from './component/example.component';
import { ExampleRoutingModule } from './example-routing.module';


@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExampleModule { }
