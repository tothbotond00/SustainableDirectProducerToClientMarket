import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptorService } from '@shared/common_services/auth-interceptor.service';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MaterialModule } from '@shared/modules/material.module';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmDeletionDialogComponent } from './confirm-deletion-dialog/confirm-deletion-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    ConfirmDeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
  JwtHelperService,
  provideAnimationsAsync(),
  DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
