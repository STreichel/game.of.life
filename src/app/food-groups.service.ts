import { Injectable } from '@angular/core';
import { FoodGroups } from './food-groups';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodGroupsService {

  private isleNumUrl = 'api/isleNum';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  getIsleNum(): Observable<FoodGroups[]> {
    return this.http.get<FoodGroups[]>(this.isleNumUrl)
      .pipe(
        tap(_ => this.log('fetched isleNum')),
        catchError(this.handleError<FoodGroups[]>('getIsleNum', []))
      );
  }

  getFoodGroupsNo404<Data>(id: number): Observable<FoodGroups> {
    const url = `${this.isleNumUrl}/?id=${id}`;
    return this.http.get<FoodGroups[]>(url)
      .pipe(
        map(isleNum => isleNum[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} foodGroups id=${id}`);
        }),
        catchError(this.handleError<FoodGroups>(`getFoodGroupsid=${id}`))
      );
  }

  getFoodGroups(id: number): Observable<FoodGroups> {
    const url = `${this.isleNumUrl}/${id}`;
    return this.http.get<FoodGroups>(url).pipe(
      tap(_ => this.log(`fetched foodGroups id=${id}`)),
      catchError(this.handleError<FoodGroups>(`getFoodGroups id=${id}`))
    );
  }

  updateFoodGroups(foodGroups: FoodGroups): Observable<any> {
    return this.http.put(this.isleNumUrl, foodGroups, this.httpOptions).pipe(
      tap(_ => this.log(`updated foodGroups id=${foodGroups.id} `)),
      catchError(this.handleError<any>('updateFoodGroups'))
    );
  }

  addFoodGroups(foodGroups: FoodGroups): Observable<FoodGroups> {
    return this.http.post<FoodGroups>(this.isleNumUrl, foodGroups, this.httpOptions).pipe(
      tap((newFoodGroups: FoodGroups) => this.log(`added foodGroups w/ id=${newFoodGroups.id}`)),
      catchError(this.handleError<FoodGroups>('addFoodGroups'))
    );
  }

  deleteFoodGroups(id: number): Observable<FoodGroups> {
    const url = `${this.isleNumUrl}/${id}`;

    return this.http.delete<FoodGroups>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted foodGroups id=${id}`)),
      catchError(this.handleError<FoodGroups>("deletedFoodGroups"))
    );
  }

  searchIsleNum(term: string): Observable<FoodGroups[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<FoodGroups[]>(`${this.isleNumUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found isleNum matching "${term}"`) :
        this.log(`no isleNum matching "${term}"`)),
      catchError(this.handleError<FoodGroups[]>('searchIsleNum', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`FoodGroupsService: ${message}`);
  }

}
