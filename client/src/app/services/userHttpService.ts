import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../authentication/';

@Injectable()
export class UserHttpService  extends Http {
    constructor(backend:ConnectionBackend, defaultOptions: RequestOptions, authService:AuthService){
        super(backend,defaultOptions);
        defaultOptions.headers.append("Cache-control", "no-cache");
        defaultOptions.headers.append("Cache-control", "no-store");
        defaultOptions.headers.append("Pragma", "no-cache");
        defaultOptions.headers.append("Expires", "0");
    }

    
}