import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CoinsService } from './coins.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  private _allAssets;
  private _asset;
  private _currentId;
  private _errorMessage;

  displayedColumns = ['coinsID', 'value', 'ownerID', 'ownerEntity'];
  dataSource = new MatTableDataSource();

  coinsID = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  ownerID = new FormControl('', Validators.required);
  ownerEntity = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _coinsService: CoinsService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      coinsID: this.coinsID,
      value: this.value,
      ownerID: this.ownerID,
      ownerEntity: this.ownerEntity
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this._coinsService.getAll()
    .toPromise()
    .then((result) => {
      this._errorMessage = null;
      result.forEach(_asset => {
        tempList.push(_asset);
      });
      this._allAssets = tempList;
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

  addAsset(form: any): Promise<any> {
    this._asset = {
      $class:
      'org.decentralized.finance.network.Coins',
      'coinsID': this.coinsID.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    this.myForm.setValue({
      'coinsID': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });

    return this._coinsService.addAsset(this._asset)
    .toPromise()
    .then(() => {
      this._errorMessage = null;
      this.myForm.setValue({
        'coinsID': null,
        'value': null,
        'ownerID': null,
        'ownerEntity': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this._errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this._errorMessage = error;
      }
    });
  }

   updateAsset(form: any): Promise<any> {
    this._asset = {
      $class:
      'org.decentralized.finance.network.Coins',
      'coinsID': this.coinsID.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    return this._coinsService.updateAsset(form.get('coinsID').value, this._asset)
    .toPromise()
    .then(() => {
      this._errorMessage = null;
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

  deleteAsset(): Promise<any> {
    return this._coinsService.deleteAsset(this._currentId)
    .toPromise()
    .then(() => {
      this._errorMessage = null;
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

  setId(id: any): void {
    this._currentId = id;
  }

  getForm(id: any): Promise<any> {
    return this._coinsService.getAsset(id)
    .toPromise()
    .then((result) => {
      this._errorMessage = null;
      const formObject = {
        'coinsID': null,
        'value': null,
        'ownerID': null,
        'ownerEntity': null
      };

      if (result.coinsID) {
        formObject.coinsID = result.coinsID;
      } else {
        formObject.coinsID = null;
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
          this._errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this._errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this._errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'coinsID': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });
  }
}
