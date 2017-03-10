import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { AuthService } from '../authentication';
import { Router } from '@angular/router';
import { MettAppointmentModel, MettOrder, AppointmentService } from './../mett-appointment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{

  public appointments: Observable<any[]>;
  public selectedItem: MettOrder[];

  constructor(private appointmentService: AppointmentService, private authService: AuthService, private router: Router){
    this.appointments = this.appointmentService.appointments.map((item: MettAppointmentModel[]) => {
      let mapped = item.map(x => {
        return {
          Date: x.Date,
          CreatedBy: x.CreatedBy,
          Orders: x.Orders.length,
          Buns: x.Orders.reduce((prev, cur, curIndex) => prev += cur.value, 0 ),
          Id: x.Id,
          OrderList: x.Orders
        };
      });
      return mapped;
    });
    this.appointmentService.loadAppointments(this.authService.id);
  }

  selectItem(item: any) {
      this.selectedItem = item.OrderList;
  }

}
