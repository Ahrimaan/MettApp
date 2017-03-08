import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../authentication';
import { AppointmentService } from './mett-appointment.service';
import { MettAppointmentModel } from './';

@Component({
  selector: 'chm-mett-appointment',
  templateUrl: './mett-appointment.component.html',
  styleUrls: ['./mett-appointment.component.css'],
  providers: [AppointmentService]
})

export class MettAppointmentComponent implements OnInit {

  private appointmentDbRoute: string = '/appointment';
  private errorMessage: string;
  private currentUser: string;
  public appointments: Observable<MettAppointmentModel[]>;
  public IsAdmin: boolean = false;

  constructor(public af: AuthService,
    public router: Router, public apoServ: AppointmentService) {
  }

  ngOnInit() {
    this.appointments = this.apoServ.appointments;
    this.af.isAdmin.subscribe(result => {
      this.IsAdmin = result;
    });
    this.apoServ.loadAppointments(this.af.id);
  }

  AddAppointment(date: Date) {
    this.errorMessage = undefined;
    this.apoServ.AddAppointment(date, this.af.username, this.af.id);
  }

  canParticipate(item: MettAppointmentModel) {
    let now = new Date();
    now.setTime(now.getTime() + (12 * 60 * 60 * 1000));
    let result = new Date(item.Date) > now;
    return result;
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
}
