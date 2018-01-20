import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Line } from '../../models/line';
import { ShowMapPage } from '../show-map/show-map';

/**
 * Generated class for the LinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lines',
  templateUrl: 'lines.html',
})
export class LinesPage {

  lines: Line[];
  searchQuery: String;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController) {
    this.lines = this.restProvider.getLines();
  }

  ionViewDidLoad() {
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }

  updateLines(){
    console.log(this.searchQuery);
    this.lines = this.restProvider.filterLines(this.searchQuery);
  }

  goToShowMap(line: Line){
    this.navCtrl.push(ShowMapPage, {'line': line})
  }

  

}
