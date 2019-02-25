import { MovieService } from './../../services/movie.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewChecked, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { isDefined } from '@angular/compiler/src/util';




@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit , OnChanges  , DoCheck {

  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all;
  favoriteList;
  popularList: any = [];
  User: any ;
  i = 0;

  constructor(public afAuth:AngularFireAuth ,
              private movieService: MovieService, 
              private router: Router, 
              public loadingCtrl: LoadingController,
    ) {

      if (this.afAuth.auth.currentUser !== null) {
        this.User = this.afAuth.auth.currentUser.displayName;
    }

      

      console.log(this.User);


     }

       
  async ngOnInit() {

      console.log("ingreso!!!");
      console.log(this.User);

        console.log(this.afAuth.auth.currentUser);
        await this.mypopularList();


        if(this.afAuth.auth.currentUser !== null){
          console.log(this.afAuth.auth.currentUser);
          this.User =this.afAuth.auth.currentUser.displayName;
          this.refresh(this.User);
          setTimeout(() => {

          }, 3000);

        }




        //  console.log(this.songList);
  }


  ngDoCheck( ): void {
    if (this.i === 0){
      this.User = this.afAuth.auth.currentUser.displayName;
      console.log(this.User);
      this.refresh(this.User);
      this.i++;
    }



  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.User = this.afAuth.auth.currentUser.displayName;
    this.favoriteList = this.movieService.getFavoriteList(this.User).valueChanges();
    this.refresh(this.User);
    console.log(this.afAuth.auth.currentUser.displayName);
    console.log(changes.User);
    console.log(this.User);
  }

  refresh(user:any){
    this.favoriteList = this.movieService.getFavoriteList(user).valueChanges();
  }


  searchChanged() {
    this.results = this.movieService.searchData(this.searchTerm, this.type);
    console.log( this.results);
  }

  async mypopularList(){
  
    this.movieService.getFilmMostPopular().subscribe(
      Response => {
        this.popularList = Response.results;
        console.log(this.popularList);
      });


  }

  async myfavoritefilm(myfilm: any){
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








}
