import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Freelancer, Cash, Coins, Service } from '@network';

@Injectable()
export class FreelancerService {
  private _freelancer = 'Freelancer';
  private _coins = 'Coins';
  private _service = 'Service';
  private _cash = 'Cash';

  constructor(
    private _freelancerService: DataService<Freelancer>,
    private _coinsService: DataService<Coins>,
    private _serviceService: DataService<Service>,
    private _cashService: DataService<Cash>) {
  }

  // Freelancer
  public getAllFreelancers(): Observable<Freelancer[]> {
      return this._freelancerService.getAll(this._freelancer);
  }

  public getFreelancer(id: any): Observable<Freelancer> {
    return this._freelancerService.getSingle(this._freelancer, id);
  }

  public addFreelancer(itemToAdd: any): Observable<Freelancer> {
    return this._freelancerService.add(this._freelancer, itemToAdd);
  }

  public deleteFreelancer(id: any): Observable<Freelancer> {
    return this._freelancerService.delete(this._freelancer, id);
  }

  public updateFreelancer(id: any, itemToUpdate: any): Observable<Freelancer> {
    return this._freelancerService.update(this._freelancer, id, itemToUpdate);
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

  // Cash
  public getAllCash(): Observable<Cash[]> {
      return this._cashService.getAll(this._cash);
  }

  public getCash(id: any): Observable<Cash> {
    return this._cashService.getSingle(this._cash, id);
  }

  public addCash(itemToAdd: any): Observable<Cash> {
    return this._cashService.add(this._cash, itemToAdd);
  }

  public updateCash(id: any, itemToUpdate: any): Observable<Cash> {
    return this._cashService.update(this._cash, id, itemToUpdate);
  }

  public deleteCash(id: any): Observable<Cash> {
    console.log(id);
    return this._cashService.delete(this._cash, id);
  }
}
