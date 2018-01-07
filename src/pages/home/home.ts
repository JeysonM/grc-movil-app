import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { PickupComponent } from '../../components/pickup/pickup';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  public isMapIdle:boolean;
  
    constructor(
      public navCtrl: NavController,
      private geolocation: Geolocation,
      public load: LoadingController
    ) {}

    
    
  
    ionViewDidLoad(){
      
      this.getPosition();
      //this.addMapEventsListeners();
    }
  
    getPosition():any{
      let loading = this.load.create({
        content: "Por favor espera...",
      });
      loading.present();
      this.geolocation.getCurrentPosition()
      .then(response => {
        
        this.loadMap(response);
        loading.dismiss();
      })
      .catch(error =>{
        console.log(error);
      })
    }
  
    loadMap(position: Geoposition){

      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(latitude, longitude);
      
      // create a new map by passing HTMLElement
      let mapEle: HTMLElement = document.getElementById('map');
  
      // create LatLng object
      let myLatLng = {lat: latitude, lng: longitude};
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
      //loading.dismiss();
    }

    addMapEventsListeners(){
      google.maps.event.addListenerOnce(this.map, 'dragstart', () => {
        this.isMapIdle = false;
        
      })

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.isMapIdle = true;
      })
    }

}
