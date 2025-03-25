import { Component, Inject, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { MoviesService } from '../../services/movies/movies.service';
import { MoviesFilter } from '../../models/movies-filter.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';
import { Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';


@Component({
  selector: 'app-pay',
  imports: [FormsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  
  titulo: string = ''; 
  funcion: string = ''; 
  funcionId: number = 0; 
  cantidad: number = 1;
  precio: number = 0;
  total: number = 0;
  tipoPago: string = '';

  
  nombre: string = '';
  tarjeta: string = '';
  expiracion: string = '';
  cvv: string = '';

  readonly dialog = inject(MatDialog);
  readonly dialog_login = inject(MatDialog);
  
  movie_filter: MoviesFilter = {
    cineId: null,
    peliculaId: null,
    titulo: null,
    fechaFuncionInicio: null,
    fechaFuncionFin: null
  };

  constructor(private route: ActivatedRoute, private movieService: MoviesService, @Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movie_filter.peliculaId = movieId ? Number(movieId) : null;
    console.log(this.movie_filter);
    this.getMovieFilter();
  }

  getMovieFilter(): void {
    this.movieService.getFilters(this.movie_filter).subscribe({
      next: (data) => {
        if(data.data == null){
          this.dialog.open(DialogModalComponent, { 
            data: { message: "Error al relacionar compra", titulo: "Error" }
          });   
        }else{
          console.log(data);
          this.titulo = data.data.titulo;
          this.funcion = data.data.fechaHora;
          this.precio = data.data.precio;
          this.funcionId = data.data.funcionId;
          this.calcularTotal();
        }
      },
      error: (err) => {
        // this.dialog.open(DialogModalComponent, { 
        //   data: { message: JSON.stringify(err.error), titulo: "Error" }
        // });
      }
    });
  }

  procesarPago() {

    if(this.tipoPago == ''){
      alert('Seleccione al menos un tipo de pago')
    }else{
      this.dialog_login.open(LoginModalComponent, {
        data: { 
          cantidad: this.cantidad,
          total : this.precio,
          peliculaId: this.movie_filter.peliculaId,
          tipoPago : this.tipoPago,
          isLogin : false
        }
      });
    }
  }

  cancelarCompra() {
    alert('Compra cancelada');
    this.router.navigate(['/home']);
  }

  calcularTotal() {
    this.total = this.cantidad * this.precio;
  }
}
