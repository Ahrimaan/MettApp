import { Route } from '@angular/router';
import { AuthenticationComponent  } from './authentication.component';
import { AuthService } from './authentication.service';
import { RegisterUserComponent } from './authentication.register.component';

export const AuthenticationRoute: Route[] = [
  { path: 'login', component: AuthenticationComponent  },
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegisterUserComponent }
];

export {AuthenticationComponent, AuthService, RegisterUserComponent };
