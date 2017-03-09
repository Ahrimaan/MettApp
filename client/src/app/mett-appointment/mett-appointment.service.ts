import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { MettAppointmentModel, MettOrder } from './';
import { Headers, Http, Jsonp } from '@angular/http';
import { HttpOptions } from './../shared';

@Injectable()
export class AppointmentService {
  private serverUrl: string = 'http://localhost:3000/mett/';

  private _appointments: BehaviorSubject<MettAppointmentModel[]>;
  private _appointmentCollection: MettAppointmentModel[];


  constructor(private httpClient: Http, private httpOptions: HttpOptions) {
    this._appointmentCollection = new Array<MettAppointmentModel>();
    this._appointments = new BehaviorSubject<MettAppointmentModel[]>([]);
  }

  get appointments() {
    return this._appointments.asObservable();
  }

  public loadAppointments(userId: string) {
    this.httpClient.get(this.serverUrl, this.httpOptions.RequestOptions)
      .map(res => res.json())
      .map((items: Array<any>) => {
        return items.map(item => {
          let model = new MettAppointmentModel();
          model.Created = item.created;
          model.CreatedBy = item.createdBy;
          model.Date = item.date;
          model.Id = item._id;
          model.participated = item.participants.filter(part => part.userID === userId).length > 0;
          model.Orders = item.participants.map(x => {
            let order = new MettOrder();
            order.payed = x.payed;
            order.specialNeeds = x.specialNeeds;
            order.userID = x.UserID;
            order.value = x.value;
            return order;
          });
          return model;
        });
      }).do(x => {
        this._appointmentCollection = x;
        this._appointments.next(this._appointmentCollection);
      }).subscribe();
  }

  GetSingleAppointment(id: string): MettAppointmentModel {
    return this._appointmentCollection.find(x => x.Id === id);
  }

  GetEnrichedMettOrders(mettId:string):Observable<any> {
      return this.httpClient.get(this.serverUrl + mettId +'/participants', this.httpOptions.RequestOptions);
  }

  DeleteAppointment(key: string) {
    this.httpClient.delete(this.serverUrl + key, this.httpOptions.RequestOptions).map(response => {
      if (response.status === 200) {
        let index = this._appointmentCollection.findIndex(x => x.Id === key);
        this._appointmentCollection.splice(index, 1);
        this._appointments.next(this._appointmentCollection);
        return true;
      }
      if (response.status === 304) {
        return false;
      }
      if (response.status === 500) {
        console.log(response);
        return false;
      }
    }).subscribe();
  }

  AddOrder(id: string, order: MettOrder) {
    return this.httpClient.post(this.serverUrl + id + '/order', order, this.httpOptions.RequestOptions);
  }

  DeleteOrder(userId: string, mettorderId: string) {
    return this.httpClient.delete(this.serverUrl + mettorderId + '/order/' + userId, this.httpOptions.RequestOptions).subscribe(resp => {
      if (resp.status === 200) {
        this.loadAppointments(userId);
      }
    });
  }

  AddAppointment(date: Date, user: string, userId: string) {
    this.httpClient.post(this.serverUrl, { date: date, username: user, userid: userId }, this.httpOptions.RequestOptions)
      .map(response => {
        return response.json();
      })
      .map(mapResponse => {
        let model = new MettAppointmentModel();
        model.Created = mapResponse.created;
        model.CreatedBy = mapResponse.createdBy;
        model.Date = mapResponse.date;
        model.Id = mapResponse.id;
        model.Orders = new Array<MettOrder>();
        return model;
      }).subscribe(item => {
        this._appointmentCollection.push(item);
        this._appointments.next(this._appointmentCollection);
      });
  }
}
