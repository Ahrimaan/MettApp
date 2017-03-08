import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// User Code Imports
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { AuthenticationComponent, AuthService, RegisterUserComponent } from './authentication';
import { MettAppointmentComponent, MettAppointmentDetailComponent, AppointmentService  } from './mett-appointment';
import { NavigationComponent } from './navigation';
import {  HttpOptions, OrderBy  } from './shared/';

import { comp } from './mett-appointment/comp';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MettAppointmentComponent,
    MettAppointmentDetailComponent,
    NavigationComponent,
    RegisterUserComponent,
    OrderBy,
    comp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    Ng2Bs3ModalModule
  ],
  providers: [AuthService,  HttpOptions, AppointmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
