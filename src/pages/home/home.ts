import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places-service";
import { PlacePage } from "../place/place";
import { UsersPage } from "../users/users";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    addPlacePage = AddPlacePage;
    usersPage = UsersPage;

    places: Place[] = [];

    constructor(
        public navCtrl: NavController,
        private placeService: PlacesService,
        private modalCtrl: ModalController,
        private platform: Platform) {

        console.log(this.platform.platforms());
    }

    ngOnInit(): void {
        this.placeService.fetchPlaces()
            .then((places: Place[]) => {
                this.places = places;
            });
    }

    ionViewWillEnter() {
        this.places = this.placeService.loadPlaces();
    }

    onOpenPlace(place: Place, index: number) {
        const modal = this.modalCtrl.create(PlacePage, { place: place, index: index });
        modal.present();
    }
}
