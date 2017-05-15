import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RangerPage } from './ranger';

@NgModule({
  declarations: [
    RangerPage,
  ],
  imports: [
    IonicPageModule.forChild(RangerPage),
  ],
  exports: [
    RangerPage
  ]
})
export class RangerPageModule {}
