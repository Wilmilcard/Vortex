import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.URL_API}/GetProductsFromApi`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.URL_API}/GetProductByIdFromApi/${id}`);
  }
}
