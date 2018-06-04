import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Line } from '../../models/line';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Checkpoint } from '../../models/checkpoint';
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
import { Location } from '../../models/location';


declare var google;

/**
 * Generated class for the ShowMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-map',
  templateUrl: 'show-map.html',
})
export class ShowMapPage {

  line: Line;
  checkpoints: Checkpoint[];
  route: any[] = [];

  map: any;
  location: Location = new Location();
  watch: any;
  marker: Marker;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation,
              public load: LoadingController,
              private googleMaps: GoogleMaps,
              public restProvider: RestProvider
            ) {
    this.line = navParams.get('line');
    this.checkpoints = this.prepareCheckpoints();

    
  }

  ionViewDidLoad() {
    this.getPositionCenter();
  }

  prepareCheckpoints(){
    return this.restProvider.getCheckpointsFromLine(this.line.id);
  }

  getPositionCenter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;

      if(this.prepareCheckpoints().length == 0){
        alert("Por el momento no existe una ruta definida")
        console.log("Por el momento no existe una ruta definida");
      }else{
        this.loadMap();
      }
      
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

        this.initRoute();
        
        this.map.addPolyline({
          points: this.route,
          'color' : '#AA00FF',
          'width': 5,
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

  resetMap(){
    this.map.clear();
    this.getPositionCenter();
  }


  initRoute(){
    this.checkpoints.forEach(checkpoint => {
      //this.addHospitalMarkerToMarkers(hospital);
      var pointOptions = {
        lat: checkpoint.latitude,
        lng: checkpoint.longitude
        }
      // var HND_AIR_PORT = {lat: -17.393603098541814, lng: -66.27667665481567};
  
      this.route.push(pointOptions)
    });
  }

}
