import { Injectable } from '@angular/core';
import { DataService } from '@dataservice';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllTransactionsService {
  private _system = 'System';
  private _transactions;

  constructor(private _transactionService: DataService<Object> ) {
  }

  public getTransactions(): Observable<Object[]> {
    return this._transactionService.transactions();
  }
}
