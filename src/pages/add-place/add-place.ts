import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location"
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';


import { PlacesService } from "../../services/places-service";

declare var cordova: any;

@Component({
    selector: 'page-add-place',
    templateUrl: 'add-place.html',
})
export class AddPlacePage {

    location: Location = {
        lat: 40.7624324,
        lng: -73.9759827
    };

    locationIsSet: boolean = false;

    imageUrl: string = "";

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private geolocation: Geolocation,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private camera: Camera,
        private placeService: PlacesService,
        private file: File
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddPlacePage');
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        const v = form.value;
        this.placeService.addPlace(v.title, v.description, this.location, this.imageUrl);
        form.reset();
        // reset stuff
        this.location = {
            lat: 40.7624324,
            lng: -73.9759827
        };
        this.imageUrl = "";
    }

    onOpenMap() {
        const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, locationIsSet: this.locationIsSet });
        modal.present();
        modal.onDidDismiss(data => {
            if (data) {
                this.location = data.location;
                this.locationIsSet = true;
            }
        });
    }

    onLocate() {
        const loader = this.loadingCtrl.create({
            content: "Getting location"
        });
        loader.present();

        this.geolocation.getCurrentPosition()
            .then(location => {
                console.log("Got location:", location);
                this.location.lat = location.coords.latitude;
                this.location.lng = location.coords.longitude;
                this.locationIsSet = true;
                loader.dismiss();
            })
            .catch(error => {
                loader.dismiss();
                console.log(error);
                const toast = this.toastCtrl.create({
                    message: "Could not get location",
                    duration: 2000
                });
                toast.present();
            });
    }

    onTakePhoto() {
        const options: CameraOptions = {
            quality: 100,
            //destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        }

        this.camera.getPicture(options)
            .then(image => {
                console.log("Image url:", image);
                // replace directory name with "" => filename
                const currentName = image.replace(/^.*[\\\/]/, "");
                const path = image.replace(/[^\/]*$/, "");
                const newFilename = new Date().getUTCMilliseconds() + ".jpg";

                this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFilename)
                    .then((data: Entry) => {
                        this.imageUrl = data.nativeURL;
                        this.camera.cleanup();
                    })
                    .catch((err: FileError) => {
                        //abort
                        this.imageUrl = "";
                        const toast = this.toastCtrl.create({
                            message: "Could not save the image.",
                            duration: 2000
                        });
                        toast.present();
                        this.camera.cleanup();
                    });

                this.imageUrl = image;
            })
            .catch(error => {
                const toast = this.toastCtrl.create({
                    message: "Could not get picture",
                    duration: 2000
                });
                toast.present();
            });
    }
}
