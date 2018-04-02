import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';

import { Freelancer, Bank, Coins, Cash, CashToCoins } from '@network';

@Injectable()
export class TransactionFbService {
  private _freelancer = 'Freelancer';
  private _bank = 'Bank';
  private _cash = 'Cash';
  private _coins = 'Coins';
  private _cashtocoins = 'CashToCoins';

  constructor(
    private _freelancerService: DataService<Freelancer>,
    private _bankService: DataService<Bank>,
    private _coinsService: DataService<Coins>,
    private _cashService: DataService<Cash>,
    private _cashToCoinsService: DataService<CashToCoins>) {
  }

  public getAllFreelancers(): Observable<Freelancer[]> {
      return this._freelancerService.getAll(this._freelancer);
  }

  public getAllBanks(): Observable<Bank[]> {
      return this._bankService.getAll(this._bank);
  }

  public getCash(id: any): Observable<Cash> {
    return this._cashService.getSingle(this._cash, id);
  }

  public getCoins(id: any): Observable<Coins> {
    return this._coinsService.getSingle(this._coins, id);
  }

  public cashToCoins(itemToAdd: any): Observable<CashToCoins> {
    return this._cashToCoinsService.add(this._cashtocoins, itemToAdd);
  }
}
