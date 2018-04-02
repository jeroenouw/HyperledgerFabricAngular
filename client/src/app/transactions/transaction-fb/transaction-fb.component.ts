import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TransactionFbService } from './transaction-fb.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-transaction-fb',
  templateUrl: './transaction-fb.component.html',
  styleUrls: ['./transaction-fb.component.scss']
})
export class TransactionFbComponent implements OnInit {
  private _bankCoinsPerCash = 10;
  private _bankCashPerCoins = (1 / this._bankCoinsPerCash).toFixed(3);
  private _coinsExchanged;
  private _cashValue;

  private _allFreelancers;
  private _allBanks;
  private _freelancer;
  private _bank;
  private _cashToCoinsObj;
  private _transactionID;
  private _cashCreditAsset;
  private _cashDebitAsset;
  private _coinsCreditAsset;
  private _coinsDebitAsset;

  public errorMessage;
  public transactionFrom;

  myForm: FormGroup;

  displayedColumns = ['freelancerID', 'firstName', 'lastName', 'coinsValue', 'serviceValue', 'serviceHours', 'cashValue', 'cashCurrency'];
  dataSource = new MatTableDataSource();

  formFreelancerID = new FormControl('', Validators.required);
  formBankID = new FormControl('', Validators.required);
  action = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);

  constructor(private _transactionService: TransactionFbService, fb: FormBuilder) {
    this.myForm = fb.group({
      formFreelancerID: this.formFreelancerID,
      formBankID: this.formBankID,
      action: this.action,
      value: this.value,
    });
  }

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllFreelancers()
    .then(() => {
      this.loadAllBanks();
    });
  }

  loadAllFreelancers(): Promise<any> {
    const tempList = [];
    return this._transactionService.getAllFreelancers()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(freelancer => {
        tempList.push(freelancer);
      });
      this._allFreelancers = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadAllBanks(): Promise<any> {
    const tempList = [];
    return this._transactionService.getAllBanks()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(bank => {
        tempList.push(bank);
      });
      this._allBanks = tempList;
    })
    .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
    });
  }

  execute(form: any): Promise<any> {
    console.log(this._allFreelancers);
    console.log(this._allBanks);

    for (const freelancer of this._allFreelancers) {
      console.log(freelancer.freelancerID);
      if (freelancer.freelancerID === this.formFreelancerID.value) {
        this._freelancer = freelancer;
      }
    }

    for (const bank of this._allBanks) {
      console.log(bank.bankID);
      if (bank.bankID === this.formBankID.value) {
        this._bank = bank;
      }
    }

    console.log('Action: ' + this.action.value);

    if (this.action.value === 'getCash') {
      this._cashValue = this.value.value;
      this._cashCreditAsset = this._freelancer.cash;
      this._cashDebitAsset = this._bank.cash;
      this._coinsCreditAsset = this._bank.coins;
      this._coinsDebitAsset = this._freelancer.coins;
    } else if (this.action.value === 'getCoins') {
      this._cashValue = this.value.value;
      this._cashCreditAsset = this._bank.cash;
      this._cashDebitAsset = this._freelancer.cash;
      this._coinsCreditAsset = this._freelancer.coins;
      this._coinsDebitAsset = this._bank.coins;
    }

    console.log('Cash Debit Asset: ' + this._cashDebitAsset);
    console.log('Coins Credit Asset: ' + this._coinsCreditAsset);
    console.log('Cash Credit Asset: ' + this._cashCreditAsset);
    console.log('Coins Debit Asset: ' + this._coinsDebitAsset);

    const splitted_cashID = this._cashDebitAsset.split('#', 2);
    const cashID = String(splitted_cashID[1]);

    const splitted_coinsID = this._coinsDebitAsset.split('#', 2);
    const coinsID = String(splitted_coinsID[1]);

    this._coinsExchanged = this._bankCoinsPerCash * this._cashValue;

    this._cashToCoinsObj = {
      $class: 'org.decentralized.finance.network.CashToCoins',
      'cashRate': this._bankCoinsPerCash,
      'cashValue': this._cashValue,
      'coinsInc': this._coinsCreditAsset,
      'coinsDec': this._coinsDebitAsset,
      'cashInc': this._cashCreditAsset,
      'cashDec': this._cashDebitAsset
    };

    return this._transactionService.getCash(cashID)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      if (result.value) {
        if ((result.value - this._cashValue) < 0 ) {
          this.errorMessage = 'Insufficient Cash!';
          return false;
        }
        return true;
      }
    })
    .then((checkCash) => {
      console.log('check cash: ' + checkCash);
      if (checkCash) {
        this._transactionService.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          if (result.value) {
            if ((result.value - this._coinsExchanged) < 0 ) {
              this.errorMessage = 'Insufficient Coins!';
              return false;
            }
            return true;
          }
        })
        .then((checkCoins) => {
          console.log('check coins: ' + checkCoins);
          if (checkCoins) {
            this._transactionService.cashToCoins(this._cashToCoinsObj)
            .toPromise()
            .then((result) => {
              this.errorMessage = null;
              this._transactionID = result.transactionId;
              console.log(result);
            })
            .catch((error) => {
              if (error === 'Server error') {
                this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
              } else if (error === '404 - Not Found') {
                this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
              } else {
                this.errorMessage = error;
              }
            })
            .then(() => {
              this.transactionFrom = false;
            });
          }
        });
      }
    });
  }
}
