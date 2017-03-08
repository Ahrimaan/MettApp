import { Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class HttpOptions {
  get RequestOptions(): RequestOptions{
    return new RequestOptions({
    withCredentials: true,
    headers:
    new Headers(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,'
            + ' Accept,user,Access-Control-Expose-Headers,Access-Control-Allow-Methods',
        'Access-Control-Expose-Headers': 'accept, authorization, content-type, x-requested-with, jwt, user',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    )
  }); }
}


