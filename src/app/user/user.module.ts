import { EmailLoginComponent } from './email-login/email-login.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective, EmailLoginComponent],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    GoogleSigninDirective
  ]
})
export class UserModule { }
