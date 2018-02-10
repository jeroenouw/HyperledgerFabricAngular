import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AllTransactionsService } from './all-transactions.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {
  private _errorMessage;
  private _allTransactions;
  private _systemTransactions = [];
  private _performedTransactions = [];

  displayedColumns = ['transactionType', 'transactionId'];
  dataSource = new MatTableDataSource();

  constructor(private serviceTransaction: AllTransactionsService, private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  sortByKey(array, key): Object[] {
    return array.sort((a, b) => {
      const x = a[key]; const y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  loadAllTransactions(): Promise<any> {
    const tempList = [];
    const systemList = [];
    const performedList = [];

    return this.serviceTransaction.getTransactions()
    .toPromise()
    .then((result) => {
      this.dataSource.data = this.sortByKey(result, 'transactionTimestamp');
      this._errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);

        const importClass = transaction['$class'];
        const importClassArray = importClass.split('.');

        if (importClassArray[1] === 'hyperledger') {
          systemList.push(transaction);
        } else {
          performedList.push(transaction);
        }
      });

      this._systemTransactions = systemList;
      this._performedTransactions = performedList;
      this._allTransactions = tempList;
      console.log(this._allTransactions);
      console.log(this._performedTransactions);
      console.log(this._systemTransactions);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errorMessage = error;
      }
    });
  }
}
