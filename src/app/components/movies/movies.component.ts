import { Component, OnInit } from '@angular/core';
import { ChangeStateRequest } from '../../models/change-state.interface';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';  

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MoviesService } from '../../services/movies/movies.service';
import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-movies',
  imports: [MatTableModule, MatSlideToggleModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{

  displayedColumns: string[] = ['id', 'titulo', 'genero', 'poster', 'estreno', 'estado'];
  state_request: ChangeStateRequest = {
    id: 0,
    estado: true
  };
  movies: any[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getAll().subscribe((response) => {
      this.movies = response.data;
    });
  }

  onEstadoChange(element: Movie): void {
    this.state_request.id = element.peliculaId;
    this.state_request.estado = element.activo;

    this.moviesService.changeState(this.state_request).subscribe(data => {
      if(data.success){
        console.log("Se actualizo pelicula");
      }
    });
  }

}
