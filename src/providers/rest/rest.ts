import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Line } from '../../models/line';
import { isArray } from 'ionic-angular/util/util';
import { Checkpoint } from '../../models/checkpoint';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl: string = 'http://localhost:3000/api/v1';
  
  restProvider: any;
  lines: Line[] = new Array();
  checkpoints: Checkpoint[] = new Array();

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  receiveLines() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/lines').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  receiveCheckpointsFromLine(line_id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/lines/'+line_id+"/points").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getLines() {
    this.lines = [];
    this.receiveLines()
    .then(data => {
      if(isArray(data)){
        data.forEach(line => {
          console.log(line);
          this.lines.push(line);
        });
      }
      
    });
    return this.lines;
  }

  getCheckpointsFromLine(line_id) {
    this.checkpoints = [];
    this.receiveCheckpointsFromLine(line_id)
    .then(data => {
      if(isArray(data)){
        data.forEach(checkpoint => {
          console.log(checkpoint);
          this.checkpoints.push(checkpoint);
        });
      }
      
    });
    return this.checkpoints;
  }

  filterLines(searchQuery: String): Line[]{
    return this.lines.filter((line) => {
      return line.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  }


  // receiveLines(){
  //   return this.http.get(this.apiUrl+'/lines');
  // }

}
