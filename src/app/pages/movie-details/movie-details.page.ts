import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;
  User: any ;


  constructor(private activatedRoute: ActivatedRoute, 
            private router: Router,
            private movieService: MovieService,
            public afAuth: AngularFireAuth ,
            public loadingCtrl: LoadingController
    ) {
      this.User = this.afAuth.auth.currentUser.displayName;
     }

  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getDetails(id).subscribe(Response => {
      if(Response.Response === 'False') {
        this.getMovieByTitle(id);
      } else {
        this.information = Response;
          console.log(this.information);
      }
    });

  }



  async myfavoritefilm(myfilm: any){
    console.log("ingreso myfilms");
    console.log(myfilm);
    const loading = await this.loadingCtrl.create();
    const user = this.User;
    const id = myfilm.imdbID;
    const name = myfilm.Title;
    const poster = myfilm.Poster;
    const year = myfilm.Year;

    this.movieService
    .createFavorite( id, name, user, poster, year)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('movies');
        });
      },
      error => {
        console.error(error);
      }
    );

    return await loading.present();
  }




  openWebsite() {
    window.open(this.information.Website, '_blank' ) ;
  }

  getMovieByTitle(title:string) {
    console.log("ingreso");

    this.movieService.getMovieByTitle(title).subscribe(result1 =>
      {
      this.information = result1;
      console.log(this.information);
    });

  }

}
