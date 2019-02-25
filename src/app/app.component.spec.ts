import { HttpClient } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { constructor } from 'console';
import { MyfavoritefilmComponent } from './myfavoritefilm/myfavoritefilm.component';
import { PopularfilmsComponent } from './popularfilms/popularfilms.component';
import { GenreFilmComponent } from './genre-film/genre-film.component';
import { HomePageModule } from './home/home.module';
import { MoviesPageModule } from './pages/movies/movies.module';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

describe('AppComponent', () => {

  const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'favorite', component: MyfavoritefilmComponent },
    { path: 'movies', loadChildren: './pages/movies/movies.module#MoviesPageModule' },
    { path: 'movies/:id', loadChildren: './pages/movie-details/movie-details.module#MovieDetailsPageModule' },
    { path: 'my-film-list', loadChildren: './pages/my-film-list/my-film-list.module#MyFilmListPageModule' },
    { path: 'my-filme-details', loadChildren: './pages/my-filme-details/my-filme-details.module#MyFilmeDetailsPageModule' },
    { path: 'popularfilm', component: PopularfilmsComponent },
    { path: 'genre/:id/:title', component: GenreFilmComponent}
  
  ];

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy , service;


  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    service = MovieService;


    TestBed.configureTestingModule({
      declarations: [AppComponent, HomePageModule, MoviesPageModule, MyfavoritefilmComponent, GenreFilmComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }


      ],

      imports:[
        RouterModule.forRoot(routes),
        AngularFireAuthModule,
        MovieService,
        AngularFireAuth
      ]
    }).compileComponents();
  }));



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
