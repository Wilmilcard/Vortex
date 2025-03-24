import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { servicesTools } from '../servicesTools';
import { GenericResponse } from '../../interface/generic.interface';
import { MoviesFilter } from '../../models/movies-filter.interface';
import { MovieCreateUpdate } from '../../models/movies-create-update.interface';
import { ChangeStateRequest } from '../../models/change-state.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends servicesTools {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${environment.URL_API}/Peliculas/GetAll`);
  }
  
  getFilters(request: MoviesFilter): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${environment.URL_API}/Peliculas/GetByFilters`, request)
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  create(request: MovieCreateUpdate): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${environment.URL_API}/Peliculas/Create`, request)
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  update(request: MovieCreateUpdate): Observable<GenericResponse> {
    return this.http
      .put<GenericResponse>(`${environment.URL_API}/Peliculas/Update`, request)
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

  changeState(request: ChangeStateRequest): Observable<GenericResponse> {
    return this.http
      .put<GenericResponse>(`${environment.URL_API}/Peliculas/ChangeState`, request)
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      );
  }

}
