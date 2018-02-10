import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Service } from '@network';

@Injectable()
export class ServiceService {
  private _namespace = 'Service';

  constructor(private _dataService: DataService<Service>) {
  }

  public getAll(): Observable<Service[]> {
    return this._dataService.getAll(this._namespace);
  }

  public getAsset(id: any): Observable<Service> {
    return this._dataService.getSingle(this._namespace, id);
  }

  public addAsset(itemToAdd: any): Observable<Service> {
    return this._dataService.add(this._namespace, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Service> {
    return this._dataService.update(this._namespace, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Service> {
    return this._dataService.delete(this._namespace, id);
  }
}
