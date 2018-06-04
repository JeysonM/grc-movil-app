import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ModalTypeZoneBlockedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-type-zone-blocked',
  templateUrl: 'modal-type-zone-blocked.html',
})
export class ModalTypeZoneBlockedPage {

  public typeZoneBlocked: String;
  public dataBlockedZone: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private view: ViewController,
              public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTypeZoneBlockedPage');
  }

  ionViewWillLoad(){
    this.dataBlockedZone = this.navParams.get('data');
  }

  closeModal(){
    this.view.dismiss();
  }

  sendBlockedZone(){
    const data = {
      latitude: this.dataBlockedZone.latitude,
      longitude: this.dataBlockedZone.longitude,
      typeZoneBlocked: this.typeZoneBlocked
    }
    this.restProvider.postZoneBlockedData(data)
    this.view.dismiss();

  }

}
