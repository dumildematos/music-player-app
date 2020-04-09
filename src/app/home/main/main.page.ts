import { Component, OnInit , ViewChild} from '@angular/core';
import { IonRange } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Howl } from 'howler';
import { Track } from './../../models/track.interface';
import { PlayerModalPage } from './../player-modal/player-modal.page';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  slideOptsThumbs = {
    spaceBetween: 0,
    slidesPerView: 1.50,
  };
  category = [
    { id: 1,
      name: 'Rap'
    },
    {
      id: 2,
      name: 'R&B'
    },
    {
      id: 3,
      name: 'Indie'
    },
    {
      id: 4,
      name: 'Rock'
    },
    {
      id: 4,
      name: 'Hip Hop'
    },
    { 
      id: 5,
      name: 'Blues'
    }
  ];
  playlist: Track[] = [
    {
      artist: 'Força Suprema',
      title: 'Deixa O Clima Rolar',
      thumb: 'assets/tracks/albuns/Forca_Suprema/cover.jpg',
      path:'assets/tracks/albuns/Forca_Suprema/05_Deixa_O_Clima_Rolar.mp3'
    },
    {
      artist: 'NGA',
      title: 'Quero o mundo',
      thumb: 'assets/tracks/albuns/NGA_KING/NGA-KING-DOWNLOAD.jpg',
      path:'assets/tracks/albuns/NGA_KING/12_Quero_o_mundo_ft_SP_Prod.mp3'
    },
    {
      artist: 'Prodígio',
      title: 'O Melhor',
      thumb: 'assets/tracks/albuns/Prodígio_ProEvo2/cover.png',
      path:'assets/tracks/albuns/Prodígio_ProEvo2/06_O_Melhor.mp3'
    }
  ];
  activeTrack : Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    
  }
  start(track: Track) {
    
    if(this.player)
      this.player.stop();

    this.player = new Howl({
        src: [track.path],
        html5: true,  
        onplay: () => {
          // this.presentModal(track);
          this.isPlaying = true;
          this.activeTrack = track;
          this.updateProgress();
        },
        onend: () => {
          console.log('finished')
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
      
    },1000);
  }

  async presentModal(track: Track) {
    const modal = await this.modalController.create({
      component: PlayerModalPage,
      componentProps: {
        'track': track,
        'playlist': this.playlist
      }
    });
    return await modal.present();
  }

}
