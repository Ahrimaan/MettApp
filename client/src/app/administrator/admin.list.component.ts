import { Observable } from 'rxjs/Rx';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication';
import { MettAppointmentModel, MettOrder, AppointmentService } from './../mett-appointment';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin.list.component.html'
})
export class AdminListComponent {
  @Input() public orders: MettOrder[];

  constructor() {
  }
}
