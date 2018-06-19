import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage {

  profile: Profile = new Profile();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public profileService: RestProvider, public angularFireAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
  let suscriptor = profileService.getProfile().subscribe(data => {
     this.profile = data;
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingsPage');
  }

  updateProfile(){
    this.profileService.updateProfile(this.profile);
    this.navCtrl.setRoot('TabsPage'); 
  }

}
