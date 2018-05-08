import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Property } from './property';
import { Price,Prices } from './price';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class PropertyService {




   private propertiesURL = 'http://localhost:9000/v1/properties';  // URL to web api
 
  constructor( private http: HttpClient) { }
 
  /** GET properties from the server */
  getProperties (): Observable<Property[]> {
    return this.http.get<Property[]>(this.propertiesURL)
      .pipe(
        tap(properties => console.log(`fetched properties`)),
        catchError(this.handleError('getProperties', []))
      );
  }


  /**GET Property Bt Id **/
  getProperty(id: number): Observable<Property> {
    const url = `${this.propertiesURL}/${id}`;
    return this.http.get<Property>(url).pipe(
      tap(_ => console.log(`fetched property id=${id}`)),
      catchError(this.handleError<Property>(`getproperty id=${id}`))
    );
  }



  /** POST: add a new property to the server */
  addProperty (property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertiesURL, property, httpOptions).pipe(
      tap((property: Property) => console.log(`added property w/ id=${property.id}`)),
      catchError(this.handleError<Property>('addProperty'))
    );
  }



    /** DELETE: delete the property from the server */
  deleteProperty (property: Property ): Observable<Property> {
    const url = this.propertiesURL+"/"+property.id;
 
    return this.http.delete<Property>(url,httpOptions).pipe(
      tap(_ => console.log(`deleted property id=${property.id}`)),
      catchError(this.handleError<Property>('deleteproperty'))
    );
  }
 
  /** PATCH: update the property on the server */
  updateproperty (property: Property): Observable<any> {
     const url = `${this.propertiesURL}/${property.id}`;
    return this.http.patch(url, property, httpOptions).pipe(
      tap(_ => console.log(`updated property id=${property.id}`)),
      catchError(this.handleError<any>('updateproperty'))
    );
  }


  getPrices(id: number): Observable<Prices> {
    const url = `${this.propertiesURL}/${id}/prices`;
    return this.http.get<Prices>(url).pipe(
      tap(_ => console.log(`fetched prices id=${id}`)),
      catchError(this.handleError<Prices>(`getproperty id=${id}`))
    );
  }


  addPrice(id:number,price:Price) :Observable<any>{
        const url = `${this.propertiesURL}/${id}/prices`;
         return this.http.post<Prices>(url,price,httpOptions).pipe(
      tap(_ => console.log(`addded prices id=${id}`)),
      catchError(this.handleError<Prices>(`addPrice id=${id}`))
    );



  }






 private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      console.error(error); 
 
      console.log(`${operation} failed: ${error.message}`);
 
      return of(result as T);
    };
  }


}
