import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerModalPage } from './player-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerModalPageRoutingModule {}
