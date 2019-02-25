import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-popularfilms',
  templateUrl: './popularfilms.component.html',
  styleUrls: ['./popularfilms.component.scss'],
})
export class PopularfilmsComponent implements OnInit {

  popularList: any = [];
  constructor(private movieService: MovieService ) {
   // this.User = this.afAuth.auth.currentUser.displayName;
   }

  async ngOnInit() {
    await this.mypopularList();
  }

  async mypopularList() {

    this.movieService.getFilmMostPopular().subscribe(
      Response => {
        this.popularList = Response.results;
        console.log(this.popularList);
      });

  }


}
