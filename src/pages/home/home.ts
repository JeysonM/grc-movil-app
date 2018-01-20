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
  Marker,
  Polyline	
} from '@ionic-native/google-maps';
import { RestProvider } from '../../providers/rest/rest';
import { Checkpoint } from '../../models/checkpoint';


declare var google;
var HND_AIR_PORT = {lat: -17.393603098541814, lng: -66.27667665481567};
      var SFO_AIR_PORT = {lat: -17.393029755856787, lng: -66.2700891494751};
      var HNL_AIR_PORT = {lat: -17.39291713476104, lng: -66.26922011375427};
      var AIR_PORTS = [
        HND_AIR_PORT,
        HNL_AIR_PORT,
        SFO_AIR_PORT
      ];

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
  public isMainMarkerActivated: boolean;
  public isTwoMarkers: boolean;
  public countMarkers: number;
  public isMapIdle:boolean;
  
    constructor(
      public navCtrl: NavController,
      private geolocation: Geolocation,
      public load: LoadingController,
      private googleMaps: GoogleMaps,
      public restProvider: RestProvider
    ) {
      this.isPickupRequested = false;
      this.isMainMarkerActivated = false;
      this.isTwoMarkers = false;
      this.countMarkers = 1;
      //this.checkpoints = this.restProvider.getCheckpointsFromLine();

      
    }

    


    ionViewDidLoad() {
      

      this.getPositionCenter();
      
      //this.watchPositionCenter();
      
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
        gestures: {
          scroll: true,
          tilt: true,
          rotate: true,
          zoom: true
        },
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true
        },
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

      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          this.map.addPolyline({
            points: AIR_PORTS,
            'color' : '#AA00FF',
            'width': 10,
            'geodesic': true
          });

          this.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
          .subscribe(
            (data) => {
                //data.latLng.lat();  
                //this.addMainMarker();
                alert('MAP_LONG_CLICK');
                
                //alert(data.lat +','+data.lng);
            })
          //this.addMainMarker();

        });
    }

    addMainMarker(){
      if(this.isMainMarkerActivated != true){

        this.getPositionCenter();
        this.activateMarker();
        let markerOptions: MarkerOptions = {
          title: 'GRC APP version 2.8',
          icon: 'blue',
          animation: 'BOUNCE',
          position: {
            lat: this.location.latitude,
            lng: this.location.longitude
          },
          draggable: true
        }
  
        this.map.addMarker(markerOptions)
          .then(marker => {
            this.marker = marker;
  
            marker.on(GoogleMapsEvent.MARKER_DRAG_END)
            .subscribe(() => {
              console.log(marker);
            });
  
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.location.latitude = marker.getPosition().lat;
                this.location.longitude = marker.getPosition().lng;
                if(this.isTwoMarkers != true){
                  this.addMarkerToTap(this.location.latitude,this.location.longitude);
                  this.increaseMarkerCounter();
                }
              });
        });
      }
      
    }
    

    addMarkerToTap(lati,longi){

      let markerOptions2: MarkerOptions = {
        title: 'Origin',
        icon: 'assets/icon/pin-init.png',
        animation: 'BOUNCE',
        position: {
          lat: lati,
          lng: longi
        }
      }

      this.map.addMarker(markerOptions2)
            .then(marker => {
              this.marker = marker;
              marker.setTitle(lati+','+longi);
            });
    }


    resetMap(){
      this.map.clear();
      this.deactivateMarker();
      this.getPositionCenter();
      this.deactivateMarkerCounter();
    }

    activateMarker(){
      this.isMainMarkerActivated = true;
    }

    deactivateMarker(){
      this.isMainMarkerActivated = false;
    }
    
    confirmPickup(){
      this.isPickupRequested = true;
    }

    cancelPickup(){
      this.isPickupRequested = false;
    }

    addOriginLocation(coord){
      //this.watchPositionCenter();
      this.originAndDestiny.setOrigin(coord);
    }
    addDestinyLocation(coord){
      //this.watchPositionCenter();
      this.originAndDestiny.setDestiny(coord);
    }

    cleanLocation(){
      this.originAndDestiny.cleanValues();
    }

    activateMarkerCounter(){
      this.isTwoMarkers = true;
    }

    deactivateMarkerCounter(){
      this.isTwoMarkers = false;
      this.countMarkers = 1;
    }

    increaseMarkerCounter(){
      if(this.countMarkers != 2){
        this.countMarkers = this.countMarkers + 1;
      }
      else{
        this.activateMarkerCounter();
      }
      
    }

}
