import {  AdminComponent } from './admin.component';
import { AdminListComponent } from './admin.list.component';
import { Route, CanActivate } from '@angular/router';
import { AuthService } from './../authentication';


export const AdminRoute: Route[] = [
   { path: 'admin', component: AdminComponent }
]

export { AdminComponent, AdminListComponent};
