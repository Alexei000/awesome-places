import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage {

    @ViewChild(Navbar) navbar: Navbar;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
    }

    ionViewWillEnter() {
        this.navbar.setBackButtonText("Go to Home");
    }

}
