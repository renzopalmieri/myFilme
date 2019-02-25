import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myfavoritefilm',
  templateUrl: './myfavoritefilm.component.html',
  styleUrls: ['./myfavoritefilm.component.scss'],
})
export class MyfavoritefilmComponent implements OnInit {

  User: any ;
  favoriteList;


  constructor(public afAuth:AngularFireAuth ,
              private movieService: MovieService,
              private router: Router,
              public loadingCtrl: LoadingController) 
              { this.User = this.afAuth.auth.currentUser.displayName;}

  ngOnInit() {
          console.log("ingreso!!!");
          console.log(this.User);

      console.log(this.afAuth.auth.currentUser);


      if(this.afAuth.auth.currentUser !== null){
        console.log(this.afAuth.auth.currentUser);
        this.User =this.afAuth.auth.currentUser.displayName;
        this.refresh(this.User);
      }

  }


  refresh(user: any){
    this.favoriteList = this.movieService.getFavoriteList(user).valueChanges();
  }

}
