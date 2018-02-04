import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Configuration } from './configuration';

@Injectable()
export class DataService<Type> {
  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: HttpHeaders;
  private options: any;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    this.options = ({ headers: this.headers });
  }

  public getAll(ns: string): Observable<Type[]> {
    console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns, this.options);
    return this._http.get(`${this.actionUrl}${ns}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getSingle(ns: string, id: string): Observable<Type> {
    console.log('GetSingle ' + ns);
    return this._http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix, this.options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public add(ns: string, asset: Type): Observable<Type> {
    console.log('Entered DataService add');
    console.log('Add ' + ns);
    console.log('asset', asset);
    return this._http.post(this.actionUrl + ns, asset, this.options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
    console.log('Update ' + ns);
    console.log('what is the id?', id);
    console.log('what is the updated item?', itemToUpdate);
    console.log('what is the updated item?', JSON.stringify(itemToUpdate));
    return this._http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate, this.options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public delete(ns: string, id: string): Observable<Type> {
    console.log('Delete ' + ns);
    return this._http.delete(this.actionUrl + ns + '/' + id, this.options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public transactions(): Observable<Type[]> {
    console.log('Get transactions ');
    return this._http.get(this.actionUrl + 'system/historian', this.options)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
