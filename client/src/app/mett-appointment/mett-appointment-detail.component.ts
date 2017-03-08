import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from './mett-appointment.service';
import { MettOrder } from './mett-appointment-detail.model';
import { MettAppointmentModel } from './mett-appointment.model';
import { AuthService } from './../authentication';

@Component({
  selector: 'chm-mett-appointment-detail',
  templateUrl: './mett-appointment-detail.component.html',
  styleUrls: ['./mett-appointment-detail.component.css'],
  providers: [AppointmentService]
})
export class MettAppointmentDetailComponent implements OnInit {

  private appointmentId: string;
  public order: MettOrder = new MettOrder();
  private appModel: MettAppointmentModel;
  private errorMessage: string = null;
  private date: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public appServ: AppointmentService) {
    this.route.params.map(parameters => {
      this.appointmentId = parameters['id'];
      this.getMettAppointment(this.appointmentId);
    }).subscribe();
  }

  ngOnInit() {

  }

  referToPaypal() {
    window.open('https://www.paypal.me/PawelWarmuth/' + this.order.value);
  }

  getMettAppointment(id: string) {
   /* this.appServ.GetSingleAppointment(id)
      .map(res =>  {
        let userId = this.auth.id;
        let order = res.Orders.filter(pred => pred.userID === userId)[0];
        if (order) {
          return order;
        }
        return new MettOrder();
      })
      .subscribe((res: MettOrder) => {
        this.order = res;
      }); */
  }

  showPaypalButton(): boolean {
    return this.order.payed;
  }

  saveOrder() {
    this.order.userID = this.auth.id;
    this.appServ.AddOrder(this.appointmentId, this.order).subscribe(res => {
      if (res.status === 200) {
        console.log(res);
        this.router.navigateByUrl('/home');
      }
    });
  }
}
