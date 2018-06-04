import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockedZonesPage } from './blocked-zones';

@NgModule({
  declarations: [
    BlockedZonesPage,
  ],
  imports: [
    IonicPageModule.forChild(BlockedZonesPage),
  ],
})
export class BlockedZonesPageModule {}
