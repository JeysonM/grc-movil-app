import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { PickupComponent } from '../../components/pickup/pickup';

@NgModule({
  declarations: [
    HomePage
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