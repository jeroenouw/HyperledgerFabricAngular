import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Client, Coins, Service } from '@network';

@Injectable()
export class ClientService {
  private _client = 'Client';
  private _coins = 'Coins';
  private _service = 'Service';
  private _cash = 'Cash';

  constructor(
    private _clientService: DataService<Client>,
    private _coinsService: DataService<Coins>,
    private _serviceService: DataService<Service>) {
  }

  // Client
  public getAllClients(): Observable<Client[]> {
    return this._clientService.getAll(this._client);
  }

  public getClient(id: any): Observable<Client> {
    return this._clientService.getSingle(this._client, id);
  }

  public addClient(itemToAdd: any): Observable<Client> {
    return this._clientService.add(this._client, itemToAdd);
  }

  public deleteClient(id: any): Observable<Client> {
    return this._clientService.delete(this._client, id);
  }

  public updateClient(id: any, itemToUpdate: any): Observable<Client> {
    return this._clientService.update(this._client, id, itemToUpdate);
  }

  // Coins
  public getAllCoins(): Observable<Coins[]> {
    return this._coinsService.getAll(this._coins);
  }

  public getCoins(id: any): Observable<Coins> {
    return this._coinsService.getSingle(this._coins, id);
  }

  public addCoins(itemToAdd: any): Observable<Coins> {
    return this._coinsService.add(this._coins, itemToAdd);
  }

  public updateCoins(id: any, itemToUpdate: any): Observable<Coins> {
    return this._coinsService.update(this._coins, id, itemToUpdate);
  }

  public deleteCoins(id: any): Observable<Coins> {
    console.log(id);
    return this._coinsService.delete(this._coins, id);
  }

  // Service
  public getAllServices(): Observable<Service[]> {
    return this._serviceService.getAll(this._service);
  }

  public getService(id: any): Observable<Service> {
    return this._serviceService.getSingle(this._service, id);
  }

  public addService(itemToAdd: any): Observable<Service> {
    return this._serviceService.add(this._service, itemToAdd);
  }

  public updateService(id: any, itemToUpdate: any): Observable<Service> {
    return this._serviceService.update(this._service, id, itemToUpdate);
  }

  public deleteService(id: any): Observable<Service> {
    return this._serviceService.delete(this._service, id);
  }
}
