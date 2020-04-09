import { Howl } from 'howler';
import { Track } from './../../models/track.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController, IonRange } from '@ionic/angular';
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
  activeTrack : Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  
  constructor(
    navParams: NavParams, 
    public modalController: ModalController,
    private elementRef: ElementRef) {
    console.log(navParams.get('track'));
  }

  ngOnInit() {
    this.scripts();
    // this.playSong();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  playSong() {
    playSample(this.track.path);
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
