import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonRange } from '@ionic/angular';
import { Track } from './../../models/track.interface';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
})
export class PlayerModalPage implements OnInit {

  @Input() track: Track;
  @Input() playlist: Track[];
  @Input() player;
  @Input() isPlaying;
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

}
