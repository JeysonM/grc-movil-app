import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Line } from '../../models/line';
import { isArray } from 'ionic-angular/util/util';
import { Checkpoint } from '../../models/checkpoint';
import { Observable } from 'rxjs/Observable';
import { BlockedZone } from '../../models/blockedZone';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Injectable()
export class RestProvider {

  
  //apiUrl: string = 'http://localhost:3000/api/v1'; 
  apiUrl: string = 'https://grc-web-app.herokuapp.com/api/v1';

  restProvider: any;
  lines: Line[] = new Array();
  checkpoints: Checkpoint[] = new Array();
  blockedZones: BlockedZone[] = new Array();
  profile: AngularFireObject<Profile>;
  // blockedZoneData: Observable<any>;

  constructor(public http: HttpClient,
              public angularFireAuth: AngularFireAuth,
              private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello RestProvider Provider');
    //this.profile = angularFireDatabase.object('/profile/'+angularFireAuth.auth.currentUser.uid);
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

  postZoneBlockedData(blockedZoneData){
    this.http.post(this.apiUrl+'/sieges/',blockedZoneData).subscribe(data => {
      alert("Solicitud de bloqueo enviado");

    });
  }

  receiveBlockedZones() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/sieges').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getBlockedZones() {
    this.blockedZones = [];
    this.receiveBlockedZones()
    .then(data => {
      if(isArray(data)){
        data.forEach(bZone => {
          console.log(bZone);
          this.blockedZones.push(bZone);
        });
      }
      
    });
    return this.blockedZones;
  }

  getProfile(): Observable<Profile>{
    return this.profile.valueChanges();
  }

  createProfile(profile: Profile){
    this.angularFireAuth.authState.take(1).subscribe(auth => {
       this.angularFireDatabase.object(`profile/${auth.uid}`).set(profile);
    })
  }

  updateProfile(profile:Profile){
    this.angularFireDatabase.object('/profile/' + this.angularFireAuth.auth.currentUser.uid).update(profile);
  }

}
