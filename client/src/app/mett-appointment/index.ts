import { Route, CanActivate } from '@angular/router';
import { MettAppointmentComponent  } from './mett-appointment.component';
import { MettAppointmentDetailComponent  } from './mett-appointment-detail.component';
import { AppointmentService } from './mett-appointment.service';
import { MettAppointmentModel } from './mett-appointment.model';
import { MettOrder } from './mett-appointment-detail.model';

export const MettAppointmentRoute: Route[] = [
   { path: 'home', component: MettAppointmentComponent },
   { path: 'home/:id', component: MettAppointmentDetailComponent  }
]

export { MettAppointmentComponent, MettAppointmentDetailComponent, AppointmentService, MettAppointmentModel,
  MettOrder };
