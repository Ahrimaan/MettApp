import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../authentication';
import { AppointmentService } from './mett-appointment.service';
import { MettAppointmentModel } from './';

@Component({
  selector: 'app-mett-item',
  templateUrl: './mett.item.component.html',
  styleUrls: ['./mett-appointment.component.css'],
  providers: [AppointmentService]
})

export class MettItemComponent {
  @Input() item: MettAppointmentModel

  constructor(public af: AuthService,
    public router: Router, public apoServ: AppointmentService) {
  }
  deleteAppointment(element: MettAppointmentModel) {
    this.apoServ.DeleteAppointment(element.Id);
  }

  deleteOrder(element: string) {
    this.apoServ.DeleteOrder(this.af.id, element);
  }

  navigateToAppointment(id: any) {
    this.router.navigate(['/home', id]);
  }

  canParticipate(item: MettAppointmentModel) {
    let now = new Date();
    now.setTime(now.getTime() + (12 * 60 * 60 * 1000));
    let result = new Date(item.Date) > now;
    return result;
  }
}
