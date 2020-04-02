import { Howl } from 'howler';
import { Track } from './../../models/track.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController, IonRange } from '@ionic/angular';
import * as $ from "jquery";
// declare function handleFiles(params:any) : any;
declare var Alert;
declare var handleFiles;
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
  @ViewChild('inputFile', { static: false }) inputFile;
  
  constructor(
    navParams: NavParams, 
    public modalController: ModalController,
    private elementRef: ElementRef) {
    console.log(navParams.get('track'));
  }

  ngOnInit() {
    this.scripts();
    this.loadFile();
    console.log($('#input'))
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  loadFile() {
    document.getElementById('input').onchange(handleFiles(this.track.path));
  }

  callAlert(){
    Alert('Dumilde');
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.elementRef.nativeElement.appendChild(script);
    return script;
  }
  fileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFiles(this.track.path)
    this.elementRef.nativeElement.appendChild(input);
    return input;
  }
  scripts() {
    this.addJsToElement('assets/js/jquery.min.js').onload = () => {};
    this.addJsToElement('assets/js/bufferloader.js').onload = () => {};
    this.addJsToElement('assets/js/id3-minimized.js').onload = () => {};
    this.addJsToElement('assets/js/audiovisualisierung.js').onload = () => {};

  }

}
