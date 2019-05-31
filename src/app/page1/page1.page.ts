import { Component, OnInit } from '@angular/core';
import { GlobalProvider } from "../global/global";
import { HermesProvider } from '../hermes';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  myD:string = 'SSSSS';
  message = "message on Page1.ts";
  headtext = "Page 1 Abeceda";
  
  selectedItem: any;
  icons = 
  [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ]; 

  items: Array<{title: string, sound: string, note: string, icon: string}>;

  constructor(public global: GlobalProvider,
   	          public hermes: HermesProvider)
  { }

  ngOnInit() {
  	console.log('ngOnInit Page 1');
      // data nactem az po udalosti  data:loaded
      // second page (listen for the user created event)
      // this.events.subscribe('data:loaded', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log('1 DATA LOADED event', user, 'at', time);
      // ted konecne nactem
  	  this.headtext = this.hermes.actRECS;
      var s = '//RECS[@name="' + this.hermes.actRECS + '"]/R';
      console.log('Page 1 selectNode : ' + s);
      this.selectNode(s);     
    // });   
  }

  selectNode(ss)
  {
    console.log("selectNode : " + ss);
    // var nod = this.myData.XMLdata.selectElements("//RECS/R");
    var nod = this.hermes.XMLdata.evaluate(ss, this.hermes.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    
    this.items = [];
    var i = 2;
    var actualSpan = nod.iterateNext ();
    while (actualSpan) {
      this.items.push({
        note: actualSpan.attributes['w'].value,
        sound:actualSpan.attributes['s'].value,
        title: actualSpan.innerHTML,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });

      actualSpan = nod.iterateNext ()
    }

    console.log("selectNode message = "+this.message);  
  }

    itemTapped(event, item) {
    console.log("itemTapped page1 " + item);
    console.dir(item);
    /* this.navCtrl.push(ModalPage, {
      item: item
     });
    */ 
     
     }; 
}

/*

import { Component } from '@angular/core';

import { NavController, AlertController, ModalController } from 'ionic-angular';

import { ModalPage } from '../modalpage/modalpage';

import { MyData } from '../../providers/my-data';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {


  constructor(public navCtrl: NavController,
              private myData: MyData, 
              public events: Events, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
    console.log("CONSTRUCTOR PAGE1.TS " + myData.actRECS);
    console.dir(navCtrl);
    
   // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    
    this.items = [];
    // this.selectNode('//RECS/R');
  };
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Page1');
    // data nactem az po udalosti  data:loaded
    // second page (listen for the user created event)
    this.events.subscribe('data:loaded', (user, time) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('1 DATA LOADED event', user, 'at', time);
    // ted konecne nactem
    this.selectNode('//RECS[1]/R');
    });   
    //
    // pokud uz je nacteno vezmem data z XML
    if(this.myData.loaded)
      {
         this.headtext = this.myData.actRECS;
         var s = '//RECS[@name="' + this.myData.actRECS + '"]/R';
         this.selectNode(s);     
      }
  }

  showChar(index)
  {
    console.log("showChar: ");
    console.log(this.myD);
    this.myData.showData();
  }
  
  selectNode(ss)
  {
    console.log("selectNode : " + ss);
    // var nod = this.myData.XMLdata.selectElements("//RECS/R");
    var nod = this.myData.XMLdata.evaluate(ss, this.myData.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    
    this.items = [];
    var i = 2;
    var actualSpan = nod.iterateNext ();
    while (actualSpan) {
      this.items.push({
        note: actualSpan.attributes['w'].value,
        sound:actualSpan.attributes['s'].value,
        title: actualSpan.innerHTML,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });

      actualSpan = nod.iterateNext ()
    }

    console.log("selectNode message = "+this.message);  
  }
  

  
  showAlert(item) {
    let alert = this.alertCtrl.create({
      title: item.title,
      subTitle: 'Just accepted your  request!',
      buttons: ['OK']
    });
    alert.present();
  };
  
  presentModal(item) {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }  
}


*/