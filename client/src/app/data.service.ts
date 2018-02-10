import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Configuration } from './configuration';

@Injectable()
export class DataService<Type> {
  private _resolveSuffix = '?resolve=true';
  private _actionUrl: string;
  private _headers: HttpHeaders;
  private _options: any;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this._actionUrl = _configuration.ServerWithApiUrl;
    this._headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    this._options = ({ _headers: this._headers });
  }

  public getAll(ns: string): Observable<Type[]> {
    console.log('GetAll ' + ns + ' to ' + this._actionUrl + ns, this._options);
    return this._http.get(`${this._actionUrl}${ns}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getSingle(ns: string, id: string): Observable<Type> {
    console.log('GetSingle ' + ns);
    return this._http.get(this._actionUrl + ns + '/' + id + this._resolveSuffix, this._options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public add(ns: string, asset: Type): Observable<Type> {
    console.log('Entered DataService add');
    console.log('Add ' + ns);
    console.log('asset', asset);
    return this._http.post(this._actionUrl + ns, asset, this._options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
    console.log('Update ' + ns);
    console.log('what is the id?', id);
    console.log('what is the updated item?', itemToUpdate);
    console.log('what is the updated item?', JSON.stringify(itemToUpdate));
    return this._http.put(`${this._actionUrl}${ns}/${id}`, itemToUpdate, this._options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public delete(ns: string, id: string): Observable<Type> {
    console.log('Delete ' + ns);
    return this._http.delete(this._actionUrl + ns + '/' + id, this._options)
    .pipe(
      catchError(this.handleError)
    );
  }

  public transactions(): Observable<Type[]> {
    console.log('Get transactions ');
    return this._http.get(this._actionUrl + 'system/historian', this._options)
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
