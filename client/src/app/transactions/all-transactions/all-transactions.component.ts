import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AllTransactionsService } from './all-transactions.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit, AfterViewInit {
  private _errorMessage;
  public allTransactions;
  public systemTransactions = [];
  public performedTransactions = [];

  displayedColumns = ['transactionType', 'transactionId'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _serviceTransaction: AllTransactionsService, private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

    return this._serviceTransaction.getTransactions()
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

      this.systemTransactions = systemList;
      this.performedTransactions = performedList;
      this.allTransactions = tempList;
      console.log(this.allTransactions);
      console.log(this.performedTransactions);
      console.log(this.systemTransactions);
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
