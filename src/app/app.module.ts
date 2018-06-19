import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MyLocationPage } from '../pages/my-location/my-location';
import { LinesPage } from '../pages/lines/lines';
import { NotificationPage } from '../pages/notification/notification';
import { RegisterPage } from '../pages/register/register';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { RestProvider } from '../providers/rest/rest';
import {HttpClientModule} from '@angular/common/http';
import { PickupComponent } from '../components/pickup/pickup';
import { MapComponent } from '../components/map/map';

import { GoogleMaps } from '@ionic-native/google-maps';
import { ShowMapPage } from '../pages/show-map/show-map';
import { BlockedZonesPage } from '../pages/blocked-zones/blocked-zones';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { MyLocationPageModule } from '../pages/my-location/my-location.module';
import { RegisterPageModule } from '../pages/register/register.module';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LinesPage,
    NotificationPage,
    TabsPage,
    PickupComponent,
    MapComponent,
    ShowMapPage,
    BlockedZonesPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MyLocationPageModule,
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MyLocationPage,
    LinesPage,
    NotificationPage,
    TabsPage,
    ShowMapPage,
    BlockedZonesPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AngularFireDatabase,
    AngularFireAuth
  ]
})
export class AppModule {}
