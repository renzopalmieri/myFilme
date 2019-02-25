import { GenreFilmComponent } from './genre-film/genre-film.component';
import { PopularfilmsComponent } from './popularfilms/popularfilms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyfavoritefilmComponent } from './myfavoritefilm/myfavoritefilm.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
