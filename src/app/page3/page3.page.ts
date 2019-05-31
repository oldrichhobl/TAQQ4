import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {

  constructor() { }

audio: any;

ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../assets/sounds/ba.wma.mp3';
    this.audio.load();
  }

playAudio() { 
 this.audio.play();
   this.audio.loop = false;
}

  stopAudio() {
    this.audio.pause(); 
  }

  ngOnDestroy() {
  	console.log("ngOnDestroy()");
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  playTap(event){
  	console.log(event);
    this.playAudio();
  }
}
