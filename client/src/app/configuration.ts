import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  get ApiUrlBase() {
    return 'http://localhost:3000/';
  }
}
