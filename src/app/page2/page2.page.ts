import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { GlobalProvider } from "../global/global";
import { HermesProvider } from '../hermes';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {
  private slug: string;
  // public checklist:CheckList;

  myD:string = 'SSSSS';
  message = "message on Page2.ts";
  headtext = "Page 2 Abeceda";
  
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
  	          public platform:Platform,
  	          public thisRoute: ActivatedRoute,
  	          private alertCtrl: AlertController,
   	          public hermes: HermesProvider)
  { }

  audio:any;

  ngOnInit() {
  	console.log('ngOnInit Page 2');
    this.audio = new Audio();

  	this.slug = this.thisRoute.snapshot.paramMap.get('item_id');
  	// let n_id = this.platform.getQueryParam("item_id");
  	// console.log('Param 2 Page 2 ' + n_id);
  	// let itemId = this.thisRoute.snapshot.paramMap.get('item_id');
  	console.log('Param 2B slug = ' + this.slug);
  	
      // data nactem az po udalosti  data:loaded
      // second page (listen for the user created event)
      // this.events.subscribe('data:loaded', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log('1 DATA LOADED event', user, 'at', time);
      // ted konecne nactem
  	  this.headtext = this.slug;
      var s = '//RECS[@name="' + this.slug + '"]/R';
      console.log('Page 2 selectNode : ' + s);
      this.selectNode(s);     
    // });   
  }

  selectNode(ss)
  {
    console.log("selectNode page2: " + ss);
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
    console.log("itemTapped page2 " + item);
    console.dir(item);
    /* this.navCtrl.push(ModalPage, {
      item: item
     });
    */ 
    this.audio.src = '../../assets/sounds/' + item.sound + '.wma.mp3';
    this.audio.load();
    this.audio.play();
    this.audio.loop = false;
     
     }; 

  ngOnDestroy() {
    console.log("ngOnDestroy()");
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }   
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