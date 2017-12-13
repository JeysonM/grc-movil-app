import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLocationPage } from './my-location';

@NgModule({
  declarations: [
    MyLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLocationPage),
  ],
})
export class MyLocationPageModule {}
