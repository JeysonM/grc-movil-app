import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LinesPage } from '../lines/lines';
import { BlockedZonesPage } from '../blocked-zones/blocked-zones';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = LinesPage;
  tab3Root: any = BlockedZonesPage;

  constructor() {

  }
}
