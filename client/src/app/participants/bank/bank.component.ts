import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BankService } from './bank.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  myForm: FormGroup;
  private _allBanks;
  private _bank;
  private _currentId;
  private _errormessage;

  private _coins;
  private _cash;

  displayedColumns = ['bankID', 'name', 'coinsValue', 'cashValue', 'cashCurrency'];
  dataSource = new MatTableDataSource();

  bankID = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  coinsValue = new FormControl('', Validators.required);
  cashValue = new FormControl('', Validators.required);
  cashCurrency = new FormControl('', Validators.required);

  constructor(private _bankService: BankService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      bankID: this.bankID,
      name: this.name,
      coinsValue: this.coinsValue,
      cashValue: this.cashValue,
      cashCurrency: this.cashCurrency
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  resetForm(): void {
    this.myForm.setValue({
      'bankID': null,
      'name': null,
      'coinsValue': null,
      'cashValue': null,
      'cashCurrency': null
    });
  }

  updateBank(form: any): Promise<any> {
    console.log('update check');
    this._bank = {
      $class:
      'org.decentralized.finance.network.Bank',
      'name': this.name.value,
      'coins': 'resource:org.decentralized.finance.network.Coins#CO_' + form.get('bankID').value,
      'cash': 'resource:org.decentralized.finance.network.Cash#CA_' + form.get('bankID').value
    };
    console.log(this._bank);
    return this._bankService.updateBank(form.get('bankID').value, this._bank)
    .toPromise()
    .then(() => {
      this._errormessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errormessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errormessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errormessage = error;
      }
    });
  }

  deleteBank(): Promise<any> {
    return this._bankService.deleteBank(this._currentId)
    .toPromise()
    .then(() => {
      this._errormessage = null;
      const coinsID = 'CO_' + this._currentId;
      this._bankService.deleteCoins(coinsID)
      .toPromise()
      .then(() => {
        this._bankService.deleteCash('CA_' + this._currentId)
        .toPromise()
        .then(() => {
          console.log('Deleted');
        });
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errormessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errormessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errormessage = error;
      }
    });
  }

  setId(id: any): void {
    this._currentId = id;
  }

  getForm(id: any): Promise<any> {
    return this._bankService.getBank(id)
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      const formObject = {
        'bankID': null,
        'name': null,
        'coinsValue': null,
        'cashValue': null,
        'cashCurrency': null
      };

      if (result.bankID) {
        formObject.bankID = result.bankID;
      } else {
        formObject.bankID = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errormessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errormessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errormessage = error;
      }
    });
  }

  loadAll_OnlyBanks(): Promise<any> {
    const tempList = [];
    return this._bankService.getAllBanks()
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      result.forEach(_bank => {
        tempList.push(_bank);
      });
      this._allBanks = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errormessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errormessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errormessage = error;
      }
    });
  }

  loadAll(): Promise<any>  {
    const bankList = [];
    return this._bankService.getAllBanks()
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      result.forEach(_bank => {
        bankList.push(_bank);
      });
    })
    .then(() => {
      for (const bank of bankList) {
        console.log('in for loop');
        console.log(bank.coins);

        const splitted_coinsID = bank.coins.split('#', 2);
        const coinsID = String(splitted_coinsID[1]);
        this._bankService.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            bank.coinsValue = result.value;
          }
        });

        const splitted_cashID = bank.cash.split('#', 2);
        const cashID = String(splitted_cashID[1]);
        console.log(cashID);
        this._bankService.getCash(cashID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            bank.cashValue = result.value;
          }
          if (result.currency) {
            bank.cashCurrency = result.currency;
          }
        });
      }
      this._allBanks = bankList;
    });
  }

  addBank(form: any): Promise<any> {
    return this.createAssetsBank()
      .then(() => {
        this._errormessage = null;
        this.myForm.setValue({
          'bankID': null,
          'name': null,
          'coinsValue': null,
          'cashValue': null,
          'cashCurrency': null
        });
      })
    .catch((error) => {
      if (error === 'Server error') {
        this._errormessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '500 - Internal Server Error') {
        this._errormessage = 'Input error';
      } else {
        this._errormessage = error;
      }
    });
  }

  createAssetsBank(): Promise<any> {
    this._coins = {
      $class:
      'org.decentralized.finance.network.Coins',
      'coinsID': 'CO_' + this.bankID.value,
      'value': this.coinsValue.value,
      'ownerID': this.bankID.value,
      'ownerEntity': 'Bank'
    };

    this._cash = {
      $class:
      'org.decentralized.finance.network.Cash',
      'cashID': 'CA_' + this.bankID.value,
      'currency': this.cashCurrency.value,
      'value': this.cashValue.value,
      'ownerID': this.bankID.value,
      'ownerEntity': 'Bank'
    };

    this._bank = {
      $class:
      'org.decentralized.finance.network.Bank',
      'bankID': this.bankID.value,
      'name': this.name.value,
      'coins': 'CO_' + this.bankID.value,
      'cash': 'CA_' + this.bankID.value
    };

    return this._bankService.addCoins(this._coins)
    .toPromise()
    .then(() => {
      console.log('create cash');
      this._bankService.addCash(this._cash)
      .toPromise()
      .then(() => {
        console.log('create banks');
        this._bankService.addBank(this._bank)
        .toPromise()
        .then(() => {
          console.log('created assets');
          location.reload();
        });
      });
    });
  }
}
