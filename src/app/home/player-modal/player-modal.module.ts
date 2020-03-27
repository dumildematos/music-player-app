import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerModalPageRoutingModule } from './player-modal-routing.module';

import { PlayerModalPage } from './player-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerModalPageRoutingModule
  ],
  declarations: [PlayerModalPage]
})
export class PlayerModalPageModule {}
