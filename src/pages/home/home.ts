import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { PickupComponent } from '../../components/pickup/pickup';
import { Location } from '../../models/location';
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

          // Now you can use all methods safely.
          this.map.addMarker({
              title: 'GRC APP',
              icon: 'blue',
              animation: 'BOUNCE',
              position: {
                lat: this.location.latitude,
                lng: this.location.longitude
              },
              draggable: true
            })
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


//###################################################################################################
    confirmPickup(){
      this.isPickupRequested = true;
    }

    cancelPickup(){
      this.isPickupRequested = false;
    }
  
   
  
    // getPosition():any{
    //   let loading = this.load.create({
    //     content: "Por favor espera...",
    //   });
    //   loading.present();
    //   this.geolocation.getCurrentPosition()
    //   .then(response => {
        
    //     this.loadMap(response);
    //     loading.dismiss();
    //   })
    //   .catch(error =>{
    //     console.log(error);
    //   })
    // }
  
    // loadMap(position: Geoposition){

    //   let latitude = position.coords.latitude;
    //   let longitude = position.coords.longitude;
    //   console.log(latitude, longitude);
      
    //   // create a new map by passing HTMLElement
    //   let mapEle: HTMLElement = document.getElementById('map');
  
    //   // create LatLng object
    //   let myLatLng = {lat: latitude, lng: longitude};
    //   // create map
    //   this.map = new google.maps.Map(mapEle, {
    //     center: myLatLng,
    //     zoom: 15
    //   });

    //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //     let marker = new google.maps.Marker({
    //       position: myLatLng,
    //       animation: google.maps.Animation.BOUNCE,
    //       map: this.map,
    //       title: 'Hello World!',
    //       icon: '/assets/icon/pin-init.png'
    //     });
    //     mapEle.classList.add('show-map');
        
    //   });
    //   //loading.dismiss();
    // }

    // addMapEventsListeners(){
    //   google.maps.event.addListenerOnce(this.map, 'dragstart', () => {
    //     this.isMapIdle = false;
        
    //   })

    //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //     this.isMapIdle = true;
    //   })
    // }



}
