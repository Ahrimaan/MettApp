import { Routes } from '@angular/router';
import { AuthenticationRoute } from './authentication';
import { MettAppointmentRoute } from './mett-appointment';

export const AppRoutes: Routes = [
 ...AuthenticationRoute,
 ...MettAppointmentRoute
];