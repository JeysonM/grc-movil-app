import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Platform, ModalController } from 'ionic-angular';
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
  Polyline,	
  LatLng
} from '@ionic-native/google-maps';
import { RestProvider } from '../../providers/rest/rest';
import { Checkpoint } from '../../models/checkpoint';


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
  public isMainMarkerActivated: boolean;
  public isTwoMarkers: boolean;
  public countMarkers: number;
  public isMapIdle:boolean;
  
    constructor(
      public navCtrl: NavController,
      private geolocation: Geolocation,
      public load: LoadingController,
      private googleMaps: GoogleMaps,
      public restProvider: RestProvider,
      private modal: ModalController
    ) {
      this.isMainMarkerActivated = false;
      this.isTwoMarkers = false;
      this.countMarkers = 1;
      
    }

    ionViewDidLoad() {
      this.getPositionCenter();
      this.watchPositionCenter();
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

          this.map.on(GoogleMapsEvent.MAP_CLICK)
          .subscribe((e) => {
              const clickPosition= JSON.parse(e)
              
              if(this.isTwoMarkers != true){
                this.addMarkerToTap(clickPosition);
                this.increaseMarkerCounter();
              }
          
            });

          this.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
          .subscribe((e) => {
                const clickPosition= JSON.parse(e)
                //alert('MAP_LONG_CLICK 14');
                this.openModalZoneBlocked(clickPosition);
            })

        });
    }    

    addMarkerToTap(locationMarker){

      let markerOptions2: MarkerOptions = {
        title: 'Origin',
        icon: 'assets/icon/pin-init.png',
        animation: 'BOUNCE',
        position: {
          lat: locationMarker.lat,
          lng: locationMarker.lng
        }
      }

      this.map.addMarker(markerOptions2)
            .then(marker => {
              this.marker = marker;
              marker.setTitle(locationMarker.lat+','+locationMarker.lng);
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


    openModalZoneBlocked(clickPosition){
        const myData = {
          latitude: clickPosition.lat,
          longitude: clickPosition.lng,
          typeZoneBlocked: 'nothing'
        }
        const myModal = this.modal.create('ModalTypeZoneBlockedPage', { data: myData})
        myModal.present();
    }

}
