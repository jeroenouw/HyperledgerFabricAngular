import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Coins } from '@network';

@Injectable()
export class CoinsService {
  private _namespace = 'Coins';

  constructor(private _dataService: DataService<Coins>) {
  }

  public getAll(): Observable<Coins[]> {
    return this._dataService.getAll(this._namespace);
  }

  public getAsset(id: any): Observable<Coins> {
    return this._dataService.getSingle(this._namespace, id);
  }

  public addAsset(itemToAdd: any): Observable<Coins> {
    return this._dataService.add(this._namespace, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Coins> {
    return this._dataService.update(this._namespace, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Coins> {
    return this._dataService.delete(this._namespace, id);
  }
}
