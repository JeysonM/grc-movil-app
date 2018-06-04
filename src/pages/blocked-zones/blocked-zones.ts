import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlockedZone } from '../../models/blockedZone';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Location } from '../../models/location';


@IonicPage()
@Component({
  selector: 'page-blocked-zones',
  templateUrl: 'blocked-zones.html',
})
export class BlockedZonesPage {

  map: GoogleMap;
  latitude: any;
  longitude: any;
  watch: any;
  marker: Marker;
  location: Location = new Location();
  markers: any[] = [];

  blockedZones: BlockedZone[];
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                private geolocation: Geolocation,
                private googleMaps: GoogleMaps,
                public restProvider: RestProvider) {
    this.blockedZones = this.restProvider.getBlockedZones();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockedZonesPage');
    console.log(this.blockedZones);

    this.getPositionCenter();
  }

  getPositionCenter(){
    console.log('entro a getPositionCenter');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;
      this.loadMap();
      //this.initAllHospitals();
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
      console.log('Entro a loadMap');
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
            //alert('Map is ready!')
            this.initAllBlockedZones();
            this.markers.forEach(marker=>{
              this.addMarker(marker);
            });
          });
  }

    addMarker(options){
      let markerOptions: MarkerOptions = {
        position: new LatLng(options.position.latitude, options.position.longitude),
        title: options.title,
        icon: options.icon
      };
      this.map.addMarker(markerOptions)
        .then(marker => {
          this.marker = marker;
  
          marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
  
            marker.showInfoWindow()
          });
        });
    }

    initAllBlockedZones(){
      this.blockedZones.forEach(bZone => {
        //this.addHospitalMarkerToMarkers(hospital);
        let mOptions = {
          position: {
            latitude: bZone.latitude,
            longitude: bZone.longitude
          },
          title: bZone.siege_type,
          icon: 'RED'
        }
    
        this.markers.push(mOptions)
      });
    }

    

}
