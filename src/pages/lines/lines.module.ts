import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinesPage } from './lines';

import { RestProvider } from '../../providers/rest/rest';

@NgModule({
  declarations: [
    LinesPage,
    
  ],
  imports: [
    IonicPageModule.forChild(LinesPage),
  ],
})
export class LinesPageModule {}
