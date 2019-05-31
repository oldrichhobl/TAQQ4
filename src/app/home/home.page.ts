import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { Events } from '@ionic/angular';

import { GlobalProvider } from "../global/global";
import { HermesProvider } from '../hermes';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 @ViewChild('myButton', {read:ElementRef}) myButton;

 toogle: number = 0;
 message = "message on Page1.ts";
 headtext = "Page 1 Abeceda";

 public tznak:string = '?';
 public vyslov:string = 'THA';
  
   constructor( public global: GlobalProvider,
   	            public renderer: Renderer,
   	            public events: Events,
   	            public hermes: HermesProvider)
   {
   	console.log("HOME Constructor ");
   	// console.dir(hermes.items);
    //this.events.subscribe('data:loaded', (user, time) => {
      // this.items = hermes.items;	
      // user and time are the same arguments passed in `events.publish(user, time)`
      //console.log('HOMEpage DATA LOADED event', user, 'at', time);
      // ted konecne nactem
  	  //this.headtext = this.hermes.actRECS;
      //var s = '//RECS';
      //console.log('HOME selectNode : ' + s);
      //this.selectNode(s);     
    // });   
    }

  ngOnInit() {
  	console.log('HOME ngOnInit');
  }



  itemTapped(event, item) {
    console.log("itemTapped page1 " + item);
    console.dir(item);

     }

  myTap(e) {
          console.log('myTap ');
          console.dir(e);
          console.log(this.myButton);
       if((this.toogle % 2) == 0)
         {this.renderer.setElementStyle(this.myButton.nativeElement,'padding', '50px')}
       else
         {this.renderer.setElementStyle(this.myButton.nativeElement,'padding', '0px');} 
     
      this.toogle++;

    // $("#Word2").toggle();     
    // otoc();
     return true;
    }; 
  myAnimate(e) {
          console.log('myAnimate ');
          console.dir(e);
          console.log(this.myButton);
          /* zastarale 
            this.renderer.animate(this.myButton.nativeElement,'',['example'],1000,10,'ease-out')          
          */  
     
       if((this.toogle % 2) == 0)
         {this.renderer.setElementClass(this.myButton.nativeElement,'animation',true)}
       else
         {this.renderer.setElementClass(this.myButton.nativeElement,'animation',false)} 

       this.toogle++;
     
      // zmena pismena
      let znak = this.hermes.getRandomZnak();
      console.log("get znak 2");
      console.dir(znak);
      this.tznak = znak.innerHTML;
      this.vyslov = znak.getAttribute("w");

    // $("#Word2").toggle();     
    // otoc();
     return true;
    }; 
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