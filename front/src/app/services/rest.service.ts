import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


const  endpoint = 'https://on2i98ot59.execute-api.us-east-1.amazonaws.com/dev/filecsv';


export interface ACC {
  email: string;
  nomFile: string;
}

@Injectable({
  providedIn: 'root'
})


export class RestService {
  

  constructor(private http: HttpClient) { 

    
  }
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  
  sendEmail(ACC: any): Observable<any> {
    return this.http.post(endpoint , ACC).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}
