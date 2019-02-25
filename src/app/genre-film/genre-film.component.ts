import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-genre-film',
  templateUrl: './genre-film.component.html',
  styleUrls: ['./genre-film.component.scss'],
})
export class GenreFilmComponent implements OnInit {

  genreList: any = [];
   titulo: any ;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private movieService: MovieService) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.titulo = this.activatedRoute.snapshot.paramMap.get('title');
    console.log('codigo genero :' + id);
    console.log('titulo genero :' + this.titulo);
    await this.myGenreList(id);

  }



  async myGenreList(id: any) {
    this.movieService.getListFilmsByGenre(id).subscribe(
      Response => {
        this.genreList = Response.results;
        console.log(this.genreList);
      });
  }





}
