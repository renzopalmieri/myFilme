import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {


  genrelist: any = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public menuCtrl: MenuController,
    private movieService: MovieService
  ) {
    this.initializeApp();

  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    await this.mygenreList();

  }


  async mygenreList() {
    this.movieService.getGenereFilms().subscribe(
      Response => {
        this.genrelist = Response.genres;
        console.log(this.genrelist);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
       location.reload();
    }

    );
  }
}
