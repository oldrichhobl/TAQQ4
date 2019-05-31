import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

import { GlobalProvider } from "../global/global";
import { HermesProvider } from '../hermes';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  message = "message on list.page.ts";
  headtext = "List.Page Abeceda";
  
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
  
   constructor( public global: GlobalProvider,
   	            public events: Events,
                public router: Router,
   	            public hermes: HermesProvider)
   {
   	console.log("LIST Constructor ");
   	   // console.dir(hermes.items);
    //this.events.subscribe('data:loaded', (user, time) => {
       // rovnou z Hermes ?!!  this.items = hermes.items;	
      // user and time are the same arguments passed in `events.publish(user, time)`
      //console.log('HOMEpage DATA LOADED event', user, 'at', time);
      // ted konecne nactem
  	  //this.headtext = this.hermes.actRECS;
      if(hermes.loaded){
        let s = '//RECS';
        console.log('HOME selectNode : ' + s);
        this.selectNode(s);
        return;     
      };   
      this.events.subscribe('data:loaded', (user, time) => {
        let s = '//RECS';
        console.log('HOME selectNode : ' + s);
        this.selectNode(s);     
      });   
    }

  ngOnInit() {
  	console.log('LIST ngOnInit');
  }

  selectNode(ss)
  {
    console.log("LIST selectNode : " + ss);
    // var nod = this.myData.XMLdata.selectElements("//RECS/R");
    var nod = this.hermes.XMLdata.evaluate(ss, this.hermes.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    
    this.items = [];
    var i = 2;
    var actualSpan = nod.iterateNext ();
    while (actualSpan) {
      this.items.push({
        sound:'s',
        title: actualSpan.attributes['name'].value,
        note: actualSpan.attributes['namec'].value,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      actualSpan = nod.iterateNext ()
    }

    console.log("selectNode message = "+this.message);  
  }

    itemTapped(event, item) {
    console.log("itemTapped LIST " + item.title);
    console.dir(item);
    this.router.navigate( ['/page2', {item_id: item.title, opt_id: item.note}]);

    }
 

}





/*

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
  	this.headtext = this.hermes.actRECS;
    var s = '//RECS[@name="' + this.hermes.actRECS + '"]/R';
    console.log('Page 1 selectNode : ' + s);
    this.selectNode(s);     
 
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
     
     }; 
}
*/