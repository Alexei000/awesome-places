import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Place } from "../../models/place";

@Component({
    selector: 'page-place',
    templateUrl: 'place.html',
})
export class PlacePage {

    place: Place;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController) {

        this.place = this.navParams.get("place");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlacePage');
    }

    onLeave() {
        this.viewCtrl.dismiss();
    }
}
