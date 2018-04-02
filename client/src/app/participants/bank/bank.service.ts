import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';
import { Bank, Cash, Coins } from '@network';

@Injectable()
export class BankService {
  private _bank = 'Bank';
  private _coins = 'Coins';
  private _cash = 'Cash';

  constructor(
    private _bankService: DataService<Bank>,
    private _coinsService: DataService<Coins>,
    private _cashService: DataService<Cash>) {
  }

  // Bank
  public getAllBanks(): Observable<Bank[]> {
    return this._bankService.getAll(this._bank);
  }

  public getBank(id: any): Observable<Bank> {
    return this._bankService.getSingle(this._bank, id);
  }

  public addBank(itemToAdd: any): Observable<Bank> {
    return this._bankService.add(this._bank, itemToAdd);
  }

  public deleteBank(id: any): Observable<Bank> {
    return this._bankService.delete(this._bank, id);
  }

  public updateBank(id: any, itemToUpdate: any): Observable<Bank> {
    return this._bankService.update(this._bank, id, itemToUpdate);
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
