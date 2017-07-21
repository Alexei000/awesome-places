import { Storage } from '@ionic/storage';
import { File, Entry, FileError } from '@ionic-native/file';

import { Place } from "../models/place";
import { Location } from "../models/location";
import { Injectable } from "@angular/core";

declare var cordova: any;

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(
        private storage: Storage,
        private file: File) {
    }

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
        this.storage.set("places", this.places)
            .then(data => {
                console.log("OK");
            })
            .catch(error => {
                // remove last place, to not store invalid data
                this.places.splice(this.places.indexOf(place));
            });
    } 

    loadPlaces() {
        return this.places.slice();
    }

    fetchPlaces(): Promise<any> {
        return this.storage.get("places")
            .then((data: Place[]) => {
                this.places = data != null ? data : [];
                return this.places.slice();
            })
            .catch(error => {
                console.log("Could not get the places");
            });
    }

    private removeFile(place: Place) {
        const currentName = place.imageUrl.replace(/^.*[\\\/]/, "");
        const path = place.imageUrl.replace(/[^\/]*$/, "");
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(data => {
                console.log("Removed file: ", data);
            })
            .catch(err => {
                console.log(err);
                this.addPlace(place.title, place.description, place.location, place.imageUrl);
            });
    }

    deletePlace(index: number) {
        this.places.splice(index, 1);
        this.storage.set("places", this.places)
            .then(data => {

            })
            .catch(err => {

            });
    }
}