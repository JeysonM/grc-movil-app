import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/User';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user: User = new User();

  constructor( public navCtrl: NavController, 
               public navParams: NavParams,
               public angularFireAuth: AngularFireAuth, 
               public angularFireDatabase: AngularFireDatabase,
               public toastCtrl: ToastController) 
               {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    console.log(this.user);
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
    .then(result => {
      this.navCtrl.setRoot('ProfilePage');
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000
      });
      toast.present();
      console.error(error);
    })
  }

}
