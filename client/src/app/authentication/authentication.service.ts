import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpOptions } from './../shared/httpOptionHeader';
import { Subscription } from 'rxjs/Subscription';
import { UserObject } from './userObject';
import { Configuration } from './../configuration';

@Injectable()
export class AuthService {
  //TODO: Move to config
  private adminUrl: string = '';
  private userUrl: string = '';
  private localLoginUrl: string = '';
  private socialUrl: string = '';
  private authenticatedReply: BehaviorSubject<boolean>;
  private errorReply: Subject<string>;
  private isAdminReply: BehaviorSubject<boolean>;
  private authSubcriber: Subscription;
  private newWindow: any;

  constructor(public httpClient: Http, private httpOptions: HttpOptions, private config: Configuration) {
    this.adminUrl = this.config.ApiUrlBase + 'admin';
    this.userUrl = this.config.ApiUrlBase + 'user';
    this.localLoginUrl = this.config.ApiUrlBase + 'user/login';
    this.socialUrl = this.config.ApiUrlBase + 'auth';

    this.authenticatedReply = new BehaviorSubject<boolean>(false);
    this.errorReply = new Subject<string>();
    this.isAdminReply = new BehaviorSubject<boolean>(false);
    let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      this.getUserData(userObj.id);
    }
  }

  private setUserStorage(model: any) {
    sessionStorage.setItem('userObject', JSON.stringify(model));
  }

  private getUserData(id: string) {
    this.httpClient.get(this.userUrl + '/' + id, this.httpOptions.RequestOptions)
      .map(resp => resp.json())
      .subscribe(resp => {
        this.setUserStorage(resp);
        this.getAdminStatus(id);
        this.authenticatedReply.next(true);
      }, err => {
        console.log(err);
      });
  }

  private getAdminStatus(id: string) {
    this.httpClient.get(this.adminUrl + '/' + id, this.httpOptions.RequestOptions).subscribe(resp => {
      let userObj = JSON.parse(sessionStorage.getItem('userObject'));
      userObj.IsAdmin = resp.status === 200;
      this.setUserStorage(userObj);
      this.isAdminReply.next(userObj.IsAdmin);
    },
      err => {
        if (err.status !== 403) {
          this.errorReply.next(err);
        }
      }
    );
  }

  private handelError(error) {
    console.log(error);
    this.errorReply.next(error.message);
  }

  signIn(provider: string) {
    this.startAuthTimerCheck();
    this.newWindow = window.open(`${this.socialUrl}/${provider}`, 'name', 'height=585, width=770');
    if (window.focus) {
      this.newWindow.focus();
    }
  }

  unlockUser(guid: string) {
    return this.httpClient.post(this.userUrl + '/unlock/' + guid, null, this.httpOptions.RequestOptions );
  }

  startAuthTimerCheck() {
    let checkTimer = Observable.interval(1000)
      .map(() => {
        return this.httpClient.get(this.socialUrl, this.httpOptions.RequestOptions)
          .subscribe((data: Response) => {
            if (data.status === 200 || data.status === 304) {
              this.authSubcriber.unsubscribe();
              this.getUserData(data.headers.get('user'));
            } else {
              this.authSubcriber.unsubscribe();
              this.authenticatedReply.next(false);
            }
            this.newWindow.close();
          });
      });

    this.authSubcriber = checkTimer.subscribe();
  }

  signInWithMail(mail: string, password: string) {
    this.httpClient.post(this.localLoginUrl, { 'userId': mail, 'password': password }, this.httpOptions.RequestOptions).subscribe(res => {
      if (res.status === 200) {
        this.getUserData(res.json().id);
      }
    }, error => {
      this.errorReply.next(error._body);
    })
  }

  createUserAccount(mail: string, password: string, fullName: string): Observable<any> {
    return this.httpClient.post(this.userUrl,
      {
        'fullName': fullName,
        'password': password,
        'username': mail
      },
      this.httpOptions);
  }

  get userObject(): UserObject {
    let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      return userObj;
    }
  }

  get id(): string {
    let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      return userObj.id;
    }
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdminReply;
  }

  get userIsAdmin():boolean{
      let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      return userObj.IsAdmin;
    }
  }

  get username(): string {
    let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      return userObj.fullName;
    }
  }

  get avatarUrl(): string {
    let userObjString = sessionStorage.getItem('userObject');
    let userObj = JSON.parse(userObjString);
    if (userObj) {
      return userObj.avatarUrl;
    }
  }

  get authenticated(): Observable<boolean> {
    return this.authenticatedReply;
  }

  get authenticationError(): Observable<string> {
    return this.errorReply;
  }

  signOut(): void {
    this.httpClient.delete(this.userUrl + '/' + this.id, this.httpOptions.RequestOptions).subscribe(res => {
      if (res.status) {
        this.authenticatedReply.next(false);
        sessionStorage.removeItem('userObject');
      }
    })

  }
}
