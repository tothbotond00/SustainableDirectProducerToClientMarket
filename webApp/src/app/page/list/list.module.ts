import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './component/list.component';
import { ListRoutingModule } from './list-routing.module';
import { FilterDialogComponent } from './dialog/filter-dialog.component';


@NgModule({
  declarations: [
    ListComponent,
    FilterDialogComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListModule { }
