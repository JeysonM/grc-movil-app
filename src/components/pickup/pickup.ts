import { Component, Input, OnChanges } from '@angular/core';

declare var google;

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent {

  @Input() isPinSet: boolean;
  @Input() map: any;

  private pickupMarker: any;
  private popup: any;
  constructor() {
    console.log('Hello PickupComponent Component');
    //this.text = 'Hello World';
  }

  ngOnChanges(changes){

    if(this.isPinSet){
      this.showPickupMarker();
    }
    else{
      this.removePickupMarker();
    }
  }

  
  showPickupMarker(){
    this.pickupMarker = new google.maps.Marker({
      
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: '/assets/icon/pin-init.png'
    })

    setTimeout( () => {
      this.pickupMarker.setAnimation(null);
    }, 750);

    this.showPickupTime();

  }

  removePickupMarker(){
    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
    }
    
  }

  showPickupTime(){
    this.popup = new google.maps.InfoWindow({
      content: '<h5>You are Here</h5>'
    });

    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    })
  }

}
