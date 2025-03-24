import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class servicesTools{

  public getHttpOptions():httpOptions{
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${userToken}`
      })
    };
    return httpOptions;
  }

  public handlerError(error:HttpErrorResponse): Observable<never> {
    
    // let errorMessage = '';
    // errorMessage = `{ "status": false, "data": { "status": ${error.status}, "message": "${error.message}", "status_text":"${error.statusText}" } }`;
    // return throwError(errorMessage);

    return throwError(error.error);
  }

}

export class httpOptions{
  headers:HttpHeaders | undefined;
}