import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: User = new User();
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public angularFireAuth: AngularFireAuth, public toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log(this.user);
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
    .then(result => {
       this.navCtrl.push('MyLocationPage');
      //this.goToHomePage();
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000
      });
      toast.present();
      console.error(error);
    })
  }

  goToHomePage(){
    this.navCtrl.push(HomePage);
  }

}
