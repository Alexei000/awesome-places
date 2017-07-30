import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from "@ionic-native/camera";
import { IonicStorageModule } from '@ionic/storage';
import { File, Entry, FileError } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { PlacesService } from "../services/places-service";
import { UsersPage } from "../pages/users/users";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AddPlacePage,
        PlacePage,
        SetLocationPage,
        UsersPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {

        }),
        IonicStorageModule.forRoot(),
        AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key
            apiKey: "AIzaSyDXPzSApAzJfRzMCfOD_sBlS9rMDIYpAec"
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AddPlacePage,
        PlacePage,
        SetLocationPage,
        UsersPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        Camera,
        PlacesService,
        File,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
