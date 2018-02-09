import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CashService } from './cash.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  displayedColumns = ['cashID', 'ownerID', 'ownerEntity', 'currency', 'value'];
  dataSource = new MatTableDataSource();

  cashID = new FormControl('', Validators.required);
  currency = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  ownerID = new FormControl('', Validators.required);
  ownerEntity = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _cashService: CashService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      cashID: this.cashID,
      currency: this.currency,
      value: this.value,
      ownerID: this.ownerID,
      ownerEntity: this.ownerEntity
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this._cashService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class:
      'org.decentralized.finance.network.Cash',
      'cashID': this.cashID.value,
      'currency': this.currency.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    this.myForm.setValue({
      'cashID': null,
      'currency': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });

    return this._cashService.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'cashID': null,
        'currency': null,
        'value': null,
        'ownerID': null,
        'ownerEntity': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class:
      'org.decentralized.finance.network.Cash',
      'cashID': this.cashID.value,
      'currency': this.currency.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    return this._cashService.updateAsset(form.get('cashID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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


  deleteAsset(): Promise<any> {

    return this._cashService.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {
    return this._cashService.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'cashID': null,
        'currency': null,
        'value': null,
        'ownerID': null,
        'ownerEntity': null
      };

      if (result.cashID) {
        formObject.cashID = result.cashID;
      } else {
        formObject.cashID = null;
      }

      if (result.currency) {
        formObject.currency = result.currency;
      } else {
        formObject.currency = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.ownerID) {
        formObject.ownerID = result.ownerID;
      } else {
        formObject.ownerID = null;
      }

      if (result.ownerEntity) {
        formObject.ownerEntity = result.ownerEntity;
      } else {
        formObject.ownerEntity = null;
      }

      this.myForm.setValue(formObject);
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

  resetForm(): void {
    this.myForm.setValue({
      'cashID': null,
      'currency': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });
  }
}
