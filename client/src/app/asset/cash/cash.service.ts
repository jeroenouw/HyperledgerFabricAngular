import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Cash } from '@network';

@Injectable()
export class CashService {
  private namespace = 'Cash';

  constructor(private _dataService: DataService<Cash>) {
  }

  public getAll(): Observable<Cash[]> {
    return this._dataService.getAll(this.namespace);
  }

  public getAsset(id: any): Observable<Cash> {
    return this._dataService.getSingle(this.namespace, id);
  }

  public addAsset(itemToAdd: any): Observable<Cash> {
    return this._dataService.add(this.namespace, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Cash> {
    return this._dataService.update(this.namespace, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Cash> {
    return this._dataService.delete(this.namespace, id);
  }

}
