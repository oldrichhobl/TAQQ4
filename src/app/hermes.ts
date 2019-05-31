import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Events } from '@ionic/angular';

import { GlobalProvider } from "./global/global";

/*
  Generated class for the HermesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HermesProvider {
  public loaded: any = false; 
  public XMLdata: any;
  public XSLdata: any;
  XMLstring: string;
  XSLstring: string;

  
  public actRECS: string = 'All'; // nazev aktualniho bloku

  public items: any;
  public resultDocument: any;
  Parser : any;
  
  locDefXMLdata:string   = './assets/xml/alphabet.xml';
  locKatvozList:string   = './assets/hermes/katvozlist.xml';
  locXSL:string          = './assets/hermes/convert.xsl';

  constructor(public http: HttpClient, public events: Events,
              public global: GlobalProvider) 
  {
    console.log('Hello HermesProvider Provider');
  }
  
  // Nacteni XML ze serveru Hermes
  loadXML() {
    console.log("hermes.ts loadXML " + this.locDefXMLdata);
    this.http.get(this.locDefXMLdata, {responseType: 'text'}).subscribe((res) => {
       console.log("NACTENO " + this.locDefXMLdata);
       // console.dir(res);
       this.XMLstring = res;
       // domparser
       this.Parser = new (window as any).DOMParser();
       this.XMLdata = this.Parser.parseFromString(this.XMLstring, "text/xml");
       //  console.dir(this.XMLdata);
       this.loaded = true;   // mame nacteno
       //
       this.selectNode('//RECS');
       //
       this.events.publish('data:loaded', 'Data', Date.now());
       });
  }
  
// Nacteni XSL 
  loadXSL() {
    console.log("hermes.ts loadXSL " + this.locXSL);
    this.http.get(this.locXSL, {responseType: 'text'}).subscribe((res) => {
       console.log("NACTENO " + this.locXSL);
       // console.dir(res);
       this.XSLstring = res;
       // domparser
       this.Parser = new (window as any).DOMParser();
       this.XSLdata = this.Parser.parseFromString(this.XSLstring, "text/xml");
       //  console.dir(this.XMLdata);
       //  this.loaded = true;   // mame nacteno
       //
       //  this.selectNode('//RECS/REC');
       //
       //  this.events.publish('data:loaded', 'Data', Date.now());
       });
  }


  public showData(spz)
  {
    var xsltProcessor=new (window as any).XSLTProcessor();
    console.dir(this.XSLdata);
    console.dir(xsltProcessor);
    
        xsltProcessor.importStylesheet(this.XSLdata);   
        xsltProcessor.setParameter(null, "param1", spz);
        // xsltProcessor.setParameter(null, "param2", p2);
        // this.resultDocument = xsltProcessor.transformToFragment(this.XMLdata,document); 
        // console.dir(this.resultDocument);
    return xsltProcessor.transformToFragment(this.XMLdata,document);



  }

  readStatus()
  {
    console.log('HermesProvider readStatus server: '+ this.global.server);  
  }

  getRandomZnak()
  { // vyber nahodny znak
    
    let idx = Math.floor((Math.random() * 10) + 1);
    let idy = Math.floor((Math.random() * 10) + 1);
    // pocet RECS
    let pcRecs = this.XMLdata.evaluate('count(//RECS[*]/R[*])', this.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("pcRECS = " +pcRecs);
    console.log("pcRECS number = " +pcRecs.numberValue);
    console.dir(pcRecs);
    
    // vyber znak z RECS[idx] poradove cislo idy
    let nod = this.XMLdata.evaluate('//RECS['+idx+']/R['+idy+']', this.XMLdata, null, XPathResult.ANY_TYPE,null); 
    let actualSpan = nod.iterateNext ();
    return actualSpan;
  }

  selectNode(ss)
  {
    console.log("selectNodeHERMES : " + ss);
    // var nod = this.myData.XMLdata.selectElements("//RECS/R");
    var nod = this.XMLdata.evaluate(ss, this.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    console.dir(nod);
    this.items = [];
    let i = 0;
    var actualSpan = nod.iterateNext ();

    while (actualSpan) {
      this.items.push({
        id: i,
        title: actualSpan.attributes['name'].value,
         // spz: 'PM-' + actualSpan.evaluate('SPZ', this.hermes.XMLdata, null, XPathResult.ANY_TYPE,null).value;,
         // note: actualSpan.getElementsByTagName("R")[0].attributes['w'].value,
         // icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      i++;
      actualSpan = nod.iterateNext ()
    }
    console.dir(this.items); 
  }

    filterItems(searchTerm){
 
        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }
 

}
