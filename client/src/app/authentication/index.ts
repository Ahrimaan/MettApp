import { Route } from '@angular/router';
import { AuthenticationComponent  } from './authentication.component';
import { AuthService } from './authentication.service';
import { RegisterUserComponent } from './authentication.register.component';
import { UnlockComponent } from './unlock.component';

export const AuthenticationRoute: Route[] = [
  { path: 'login', component: AuthenticationComponent  },
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'unlock/:id', component: UnlockComponent}
];

export {AuthenticationComponent, AuthService, RegisterUserComponent, UnlockComponent };
