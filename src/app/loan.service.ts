import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loan } from './loan'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private loansUrl = 'https://localhost:44359/api/loan';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.loansUrl, this.httpOptions)

  }

  getLoan(id: number): Observable<Loan> {
    const url = `${this.loansUrl}/${id}`;
    return this.http.get<Loan>(url).pipe(
      tap(_ => this.log(`fetched loan id=${id}`)),
      catchError(this.handleError<Loan>(`getLoan id=${id}`))
    );
  }

  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.loansUrl, JSON.stringify(loan), this.httpOptions).pipe(
      tap((newLoan: Loan) => this.log(`added loan w/ id=${newLoan.id}`)),
      catchError(this.handleError<Loan>('addLoan'))
    );
  }

  deleteLoan(id: number): Observable<Loan> {
    
    const url = `${this.loansUrl}/${id}`;

    return this.http.delete<Loan>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted loan id=${id}`)),
      catchError(this.handleError<Loan>('deleteLoan'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    
  }
}
