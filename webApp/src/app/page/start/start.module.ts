import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './component/start.component';
import { StartRoutingModule } from './start-routing.module';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StartModule { }
