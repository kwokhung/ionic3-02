import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'RangerPage'
})
@Component({
  selector: 'page-ranger',
  templateUrl: 'ranger.html',
})
export class RangerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RangerPage');
  }

}
