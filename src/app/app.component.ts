import { Component , ViewChild} from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LinesPage } from '../pages/lines/lines';
import { NotificationPage } from '../pages/notification/notification';
import { HomePage} from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { BlockedZonesPage } from '../pages/blocked-zones/blocked-zones';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('NAV') nav: Nav;

  rootPage:any = TabsPage;
  //rootPage:any = TabsPage;
  

  public pages: Array<{titulo: string, component:any, icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      { titulo: 'Mapa',           component: TabsPage, icon:'md-map'},
      { titulo: 'Bloqueos',       component: BlockedZonesPage, icon:'ios-hand'},
      { titulo: 'Líneas',         component: LinesPage, icon:'md-bus'},
      { titulo: 'Iniciar sesión',          component: LoginPage, icon:'md-log-in'},
      { titulo: 'Acerca de',      component: AboutPage, icon:'md-people'},
      //{ titulo: 'Register',       component: RegisterPage, icon:'md-alert'},
      //{ titulo: 'Notificaciones', component: NotificationPage, icon:'md-alert'},
      // { titulo: 'tabs',           component: TabsPage, icon:'md-map'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(page){
    this.nav.setRoot(page)
  }
}
