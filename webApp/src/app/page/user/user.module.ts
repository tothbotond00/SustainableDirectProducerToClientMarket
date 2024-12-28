import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './component/user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserDialogComponent } from './dialog/user-dialog.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';


@NgModule({
  declarations: [
    UserComponent,
    UserDialogComponent,
    ImageDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
