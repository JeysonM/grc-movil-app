import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { PickupComponent } from '../../components/pickup/pickup';
import { Location } from '../../models/location';
import { PairLocation } from '../../models/pairLocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  location: Location = new Location();
  originAndDestiny: PairLocation = new PairLocation();
  watch: any;
  marker: Marker;
  public isPickupRequested: boolean;

  public isMapIdle:boolean;
  
    constructor(
      public navCtrl: NavController,
      private geolocation: Geolocation,
      public load: LoadingController,
      private googleMaps: GoogleMaps
    ) {
      this.isPickupRequested = false;
    }


    ionViewDidLoad() {
    
      this.getPositionCenter();
      this.watchPositionCenter();
      
    }

    addOriginLocation(){
      this.originAndDestiny.origin = location;
    }
    addDestinyLocation(){
      this.originAndDestiny.destiny = location;
    }
  
    getPositionCenter(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.location.latitude = resp.coords.latitude;
        this.location.longitude = resp.coords.longitude;
        this.loadMap();
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }
  
    watchPositionCenter(){
      this.watch = this.geolocation.watchPosition();
      this.watch.subscribe((data) => {
        this.location.latitude = data.coords.latitude;
        this.location.longitude = data.coords.longitude;
        if(this.marker){
          this.marker.setPosition({lat: this.location.latitude, 
            lng: this.location.longitude});
        }
      });
    }

    loadMap(){

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.location.latitude,
            lng: this.location.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          //marker Options
          let markerOptions: MarkerOptions = {
            title: 'GRC APP save',
            icon: 'assets/icon/pin-init.png',
            animation: 'BOUNCE',
            position: {
              lat: this.location.latitude,
              lng: this.location.longitude
            },
            draggable: true
          }
          // Now you can use all methods safely.
          this.map.addMarker(markerOptions)
            .then(marker => {
              this.marker = marker;

              marker.on(GoogleMapsEvent.MARKER_DRAG_END)
              .subscribe((marker) => {
                console.log(marker);
                this.location.latitude = marker.getPosition().lat;
                this.location.longitude = marker.getPosition().lng;
              });

              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
            });

        });
    }

    addMarkerToMap(){

      let markerOptions2: MarkerOptions = {
        title: 'Origin',
        icon: 'assets/icon/pin-init.png',
        animation: 'BOUNCE',
        position: {
          lat: this.location.latitude,
          lng: this.location.longitude
        },
        draggable: true
      }

      this.map.addMarker(markerOptions2)
            .then(marker => {
              this.marker = marker;

              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('Origin');
                });
            });
    }
    
    confirmPickup(){
      this.isPickupRequested = true;
    }

    cancelPickup(){
      this.isPickupRequested = false;
    }

}
