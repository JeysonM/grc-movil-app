import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  
    constructor(
      private navCtrl: NavController,
      private geolocation: Geolocation,
      public loadingCtrl: LoadingController
    ) {}
  
    ionViewDidLoad(){
      this.getPosition();
    }
  
    getPosition():any{
      

      this.geolocation.getCurrentPosition()
      .then(response => {
        
        this.loadMap(response);
        
      })
      .catch(error =>{
        console.log(error);
      })
    }
  
    loadMap(position: Geoposition){

      let loader = this.loadingCtrl.create({
        content: "Espera por favor...",
      });
      
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
      
      loader.dismiss();
  
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        let marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'Hello World!'
        });
        mapEle.classList.add('show-map');
      });
    }

}
