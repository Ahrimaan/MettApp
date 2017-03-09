import { Routes } from '@angular/router';
import { AuthenticationRoute } from './authentication';
import { MettAppointmentRoute } from './mett-appointment';
import { AdminRoute } from './administrator';

export const AppRoutes: Routes = [
 ...AuthenticationRoute,
 ...MettAppointmentRoute,
 ...AdminRoute
];
