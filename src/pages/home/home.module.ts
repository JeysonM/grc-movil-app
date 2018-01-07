import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { MapComponent } from '../../components/map/map';
//import { PickupComponent } from '../../components/pickup/pickup';

@NgModule({
  declarations: [
    HomePage,
    //MapComponent
    //PickupComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
    
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}