import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GenericResponse } from '../../interface/generic.interface';
import { servicesTools } from '../servicesTools';
import { ChangeStateRequest } from '../../models/change-state.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends servicesTools {

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${environment.URL_API}/User/GetAll`, this.getHttpOptions());
  }

  changeState(request: ChangeStateRequest): Observable<GenericResponse> {
    return this.http
      .put<GenericResponse>(`${environment.URL_API}/User/ChangeState`, request, this.getHttpOptions())
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
