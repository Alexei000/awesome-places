import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places-service";
import { PlacePage } from "../place/place";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    addPlacePage = AddPlacePage;

    places: Place[] = [];

    constructor(
        public navCtrl: NavController,
        private placeService: PlacesService,
        private modalCtrl: ModalController) {
    }

    ionViewWillEnter() {
        this.places = this.placeService.loadPlaces();
    }

    onOpenPlace(place: Place) {
        const modal = this.modalCtrl.create(PlacePage, { place: place });
        modal.present();
    }
}
