import { Component, OnInit, Input} from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoadingController, NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable'
declare var google;
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit{
  

  @Input() isPickupRequested: boolean;
  public map;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public load: LoadingController) {
    console.log('Hello MapComponent Component');
    
  }

  ngOnInit(){
   // this.map = this.createMap();
    //this.getCurrentPosition()
  }

  ionViewDidLoad(){
    this.getCurrentPosition()
    //this.getPosition();
    //this.addMapEventsListeners();
  }

  getCurrentPosition(){
    let options = {timeout: 10000, enablehighAccuracy: true}

    let locationObs = Observable.create(Observable => {

      this.geolocation.getCurrentPosition(options)
      .then(resp => {
        let latitude = resp.coords.latitude;
        let longitude = resp.coords.longitude;
  
        let location = new google.maps.LatLng(latitude, longitude);

        this.createMap(location);
        Observable.next(location);

      },(err) => {
        console.log('Geolocation err', + err);
      })

    })

   
  }

  createMap(location){
      //let latitude = 40.712784;
      //let longitude = -74.005941;
     // console.log(latitude, longitude);
      
      // create a new map by passing HTMLElement
      let mapEle: HTMLElement = document.getElementById('map');
  
      // create LatLng object
      let myLatLng = {lat: location.latitude , lng: location.longitude};
      // create map
      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 15
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        let marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.BOUNCE,
          map: this.map,
          title: 'Hello World!',
          icon: '/assets/icon/pin-init.png'
        });
        
        mapEle.classList.add('show-map');
        
      });
  }


  // centerLocation(location){
  //   if(location){
  //     this.map.panTo(location);
  //   }
  //   else{
  //     this.getCurrentPosition().subscribe(currentLocation =>{
  //       this.map.panTo(currentLocation);
  //     });
  //   }
  // }

}
