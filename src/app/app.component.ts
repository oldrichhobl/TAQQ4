import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { GlobalProvider } from "./global/global";
import { HermesProvider } from "./hermes";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Skupiny znaků',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Všechny značky',
      url: '/page1',
      icon: 'car'
    },
    {
      title: 'Výběr znaků',
      url: '/page2',
      icon: 'car'
    },
    {
      title: 'Test AUDIO',
      url: '/page3',
      icon: 'volume-high'
    },
    {
      title: 'Kvíz',
      url: '/quiz',
      icon: 'car'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'hammer'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help'
    },
    {
      title: 'Jeden znak',
      url: '/character',
      icon: 'home'
    }


  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage,
    public global: GlobalProvider,
    public hermes: HermesProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //test prohlizece pro jistotu;
      if (typeof (window as any).DOMParser != "undefined") {
         console.log("initializeAPP: OK DOMParser neni undefined !!!!!");
         }
      // nacteni zapamatovanych dat , globalu, pristup na Herma 
      this.storage.ready().then(() => {
        this.global.readGlobals(); //??? az po nacteni globalsu ??
        this.hermes.loadXML();     // uvnitr je i selectNode() 
        // this.hermes.loadXSL();  //  

        this.storage.get('theme').then(cssText => {
               // this.theme.setGlobalCSS(cssText);
        });

        // this.hermes.readStatus();
        console.log("initializeAPP: endSTOAGEready:");
      });

    });
  }
}
