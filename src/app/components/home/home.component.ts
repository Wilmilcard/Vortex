import { Component, Inject, inject } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies/movies.service';
import { MoviesFilter } from '../../models/movies-filter.interface';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';
import {MatSelectModule} from '@angular/material/select';

interface Cine {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatTableModule, 
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movies: any[] = [];
  movieId: number | null = null;
  

  readonly dialog = inject(MatDialog);

  movie_filter: MoviesFilter = {
    cineId: null,
    direccionCine: null,
    titulo: null,
    descripcion: null,
    genero: null,
    director: null,
    fechaFuncionInicio: null,
    fechaFuncionFin: null
  };

  cinemas: Cine[] = [
    {value: 1, viewValue: 'CineColombia'},
    {value: 2, viewValue: 'Cinemark'},
    {value: 3, viewValue: 'Royal Films'},
  ];

  constructor(private movieService: MoviesService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.movieService.getAll().subscribe((response) => {
      this.movies = response.data;
      console.log(this.movies);
    });
  }

  getMovieFilter(): void {
    if (this.movieId) {
      this.movieService.getFilters(this.movie_filter).subscribe({
        next: (data) => {
          console.log(data);
          //this.movies = [data.data];
        },
        error: (err) => {
          this.dialog.open(DialogModalComponent, { 
            data: { message: JSON.stringify(err.error) } // Convierte a string
          });
          this.movies = [];
          this.movie_filter = {};
        }
      });
    } else {
      this.getAllMovies();
    }
  }

  getAllMovies(): void {
    this.movieService.getAll().subscribe(data => {
      //this.movies = data;
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg';
  }
}
