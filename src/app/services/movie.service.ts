import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';




export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'

}

export interface FavoriteFilm {
  code?: string;
  name: string;
  user: string;
  poster: string;
  year: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com';
  apiKey = 'f3cba6c1';

  url2 = 'https://api.themoviedb.org/3';
  apiKey2 = '0a72569e16894ea15b7733f3c660f7fa';

  private films: Observable <FavoriteFilm[]>;

  myColection: AngularFirestoreCollection<FavoriteFilm>;





  constructor(private http: HttpClient, public firestore: AngularFirestore) {
    this.myColection = this.firestore.collection('favoriteList');
   }

 

   getFilmMostPopular() {
     //https://api.themoviedb.org/3/movie/popular?api_key=0a72569e16894ea15b7733f3c660f7fa&language=en-US&page=1
    return this.http.get<any>( this.url2 + '/movie/popular?api_key=' + `${this.apiKey2}`);
  }

  getGenereFilms(){
    //https://api.themoviedb.org/3/genre/movie/list?api_key=0a72569e16894ea15b7733f3c660f7fa&language=en-US
    return this.http.get<any>( this.url2 + '/genre/movie/list?api_key=' + `${this.apiKey2}` + '&language=en-US');
  }

  getListFilmsByGenre(codGenre: string): Observable<any> {
    // https://api.themoviedb.org/3/discover/movie?api_key=0a72569e16894ea15b7733f3c660f7fa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28

    return this.http.get<any>("https://cors.io/?"+ this.url2 + '/discover/movie/?api_key=' + `${this.apiKey2}` +'&sort_by=popularity.desc&page=1&with_genres=' + `${codGenre}`);

  }

   createFavorite(
    code: string,
    name: string,
    user: string,
    poster: string,
    year: string
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`favoriteList/${id}`).set({
      code,
      name,
      poster,
      year,
      user,
    });
  }

  getFavoriteList(id): AngularFirestoreCollection<FavoriteFilm> {
    return this.firestore.collection(`favoriteList`, ref =>
    ref.where('user', '==', id));
  }

  searchData(title: string, type:SearchType):Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
    .pipe(map(results => {
      console.log('RAW ', results);
      return results['Search'];
    }));
  }

  getDetails(id): Observable<any> {
      return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }


  getMovieByTitle(title: string): Observable<any> {
    return this.http.get(`${this.url}?t=${title}&plot=full&apikey=${this.apiKey}`);
  }





  getFavoriteByUserRef(userRef: string) {
   // this.films =  this.firestore.collection(`favoriteList`);

    return this.firestore.collection(`favoriteList`);

    //return this.firestore.collection('favoriteList', ref =>
     //ref.where('user', '==', userRef));
  }



}
