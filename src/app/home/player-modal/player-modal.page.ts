import { Track } from './../../models/track.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController, IonRange } from '@ionic/angular';
import { Howl } from 'howler';
// import * as $ from "jquery";
declare var playSample;
@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
})
export class PlayerModalPage implements OnInit {

  @Input() track: Track;
  @Input() playlist: Track[];
  // @Input() controls;
  // @Input() spectrum;
  activeTrack : Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  spinning = 'none';
  // duration = this.player.duration();
  @ViewChild('range', { static: false }) range: IonRange;
  
  constructor(
    navParams: NavParams, 
    public modalController: ModalController,
    private elementRef: ElementRef) {
    // console.log(navParams.get('track'));
  }

  ngOnInit() {
    // this.scripts();
    // this.playSong();
    this.spinning = 'rotation 3s infinite linear';
    this.start(this.track)
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  start(track: Track) {
    
    if(this.isPlaying){
      console.log('playing')
      this.player.stop(track.id);
    }

    this.player = new Howl({
      src: [this.track.path],
      html5: true,  
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log('finished')
        this.next();
      }
    });

    this.player.play();

  }
  
  togglePlayer(pause){

    this.isPlaying = !pause;
    
    if(pause){
      this.player.pause();
      this.spinning = 'none';
    }
    else{
      this.player.play();
      this.spinning = 'rotation 3s infinite linear';
    }

  }

  next(){
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1)
      this.start(this.playlist[index + 1]);
    else
      this.start(this.playlist[0]);
  }

  prev(){
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0)
      this.start(this.playlist[index - 1]);
    else
      this.start(this.playlist[this.playlist.length - 1]);
  }

  seek(){
    let newValue = +this.range.value / 100;
    let duration = this.player.duration();
    this.player.seek(duration * newValue);
  }

  updateProgress(){
    let self = this;
    let seek = this.player.seek() || 0;
    let duration = this.player.duration() / 60;
    // this.progress = ((seek / this.player.duration()) * 100 || 0);
    // console.log({'duration':duration.toFixed(2)})
    // console.log({'seek':seek,'duraction':duration})
    // console.log({'progress':seek})
    setTimeout(()=>{
      this.updateProgress();
    },1000);
  }
  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.elementRef.nativeElement.appendChild(script);
    return script;
  }
  scripts() {
    this.addJsToElement('assets/js/jquery.min.js').onload = () => {};
    this.addJsToElement('assets/js/bufferloader.js').onload = () => {};
    this.addJsToElement('assets/js/id3-minimized.js').onload = () => {};
    this.addJsToElement('assets/js/audiovisualisierung.js').onload = () => {};
  }

}
