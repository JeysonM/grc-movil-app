import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl: string = 'http://localhost:3000/api/v1';
  
  restProvider: any;
  lines: any;
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getLines() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/lines').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
