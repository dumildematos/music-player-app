import { Howl } from 'howler';
import { Track } from './../../models/track.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonRange } from '@ionic/angular';

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
  @ViewChild('range', { static: false }) range: IonRange;
  
  constructor(navParams: NavParams, public modalController: ModalController) {
    console.log(navParams.get('track'));
  }

  ngOnInit() {
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  start(track: Track) {
    
    if(this.player)
      this.player.stop();

    this.player = new Howl({
        src: [track.path],
        html5: true,  
        onplay: () => {
          this.isPlaying = true;
          this.activeTrack = track;
          this.updateProgress();
        },
        onend: () => {

        }
    });

    this.player.play();
  }

  togglePlayer(pause){

    this.isPlaying = !pause;
    if(pause)
      this.player.pause();
    else
      this.player.play();

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
    let newValue = +this.range;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress(){
    let seek = this.player.seek();
    this.progress = ((seek / this.player.duration()) * 100 ||0);
    
    setTimeout(()=>{
      this.updateProgress();
      console.log(this.player.duration())
    },1000);
  }

}
