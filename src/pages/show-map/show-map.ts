import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Line } from '../../models/line';
import { RestProvider } from '../../providers/rest/rest';
import { Checkpoint } from '../../models/checkpoint';

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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public restProvider: RestProvider
            ) {
    this.line = navParams.get('line');
    this.checkpoints = this.prepareCheckpoints();
    
  }

  ionViewDidLoad() {
    
  }

  prepareCheckpoints(){
    return this.restProvider.getCheckpointsFromLine(this.line.id);
  }

}
