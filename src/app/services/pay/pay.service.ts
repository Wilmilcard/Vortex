import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { servicesTools } from '../servicesTools';
import { GenericResponse } from '../../interface/generic.interface';
import { UserLogin } from '../../models/login.interface';
import { Pay } from '../../models/pay.interface';


@Injectable({
  providedIn: 'root'
})
export class PayService extends servicesTools {

  constructor(private http: HttpClient) { super(); }

  auth(request: UserLogin): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${environment.URL_API}/Auth/Login`, request)
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      );
  }
  
  pay(request: Pay): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${environment.URL_API}/Pagos/Pay`, request, this.getHttpOptions())
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
