import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from "../../models/location"

@Component({
    selector: 'page-set-location',
    templateUrl: 'set-location.html',
})
export class SetLocationPage {

    location: Location;
    marker: Location;
    locationIsSet: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SetLocationPage');
    }

    ionViewDidEnter() {
        this.location = this.navParams.get("location");
        this.locationIsSet = this.navParams.get("locationIsSet");

        if (this.locationIsSet)
            this.marker = this.location;
    }

    onSetMarker(event: any) {
        console.log("On set marker:", event, typeof(event));
        this.marker = new Location(event.coords.lat, event.coords.lng); 
    }

    onConfirm() {
        console.log("Confirm clicked");
        this.viewCtrl.dismiss({ location: this.marker });
    }

    onAbort() {
        this.viewCtrl.dismiss();
    }
}
