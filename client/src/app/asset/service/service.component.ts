import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ServiceService } from './service.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  private _allAssets;
  private _asset;
  private _currentId;
  private _errorMessage;

  displayedColumns = ['serviceID', 'hours', 'value', 'ownerID', 'ownerEntity'];
  dataSource = new MatTableDataSource();

  serviceID = new FormControl('', Validators.required);
  hours = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  ownerID = new FormControl('', Validators.required);
  ownerEntity = new FormControl('', Validators.required);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _serviceService: ServiceService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      serviceID: this.serviceID,
      hours: this.hours,
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
    return this._serviceService.getAll()
    .toPromise()
    .then((result) => {
      this.dataSource.data = result;
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
      'org.decentralized.finance.network.Service',
      'serviceID': this.serviceID.value,
      'hours': this.hours.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    this.myForm.setValue({
      'serviceID': null,
      'hours': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });

    return this._serviceService.addAsset(this._asset)
    .toPromise()
    .then(() => {
      this._errorMessage = null;
      this.myForm.setValue({
        'serviceID': null,
        'hours': null,
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
      'org.decentralized.finance.network.Service',
      'serviceID': this.serviceID.value,
      'hours': this.hours.value,
      'value': this.value.value,
      'ownerID': this.ownerID.value,
      'ownerEntity': this.ownerEntity.value
    };

    return this._serviceService.updateAsset(form.get('serviceID').value, this._asset)
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
    return this._serviceService.deleteAsset(this._currentId)
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
    return this._serviceService.getAsset(id)
    .toPromise()
    .then((result) => {
      this._errorMessage = null;
      const formObject = {
        'serviceID': null,
        'hours': null,
        'value': null,
        'ownerID': null,
        'ownerEntity': null
      };

      if (result.serviceID) {
        formObject.serviceID = result.serviceID;
      } else {
        formObject.serviceID = null;
      }

      if (result.hours) {
        formObject.hours = result.hours;
      } else {
        formObject.hours = null;
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
      'serviceID': null,
      'hours': null,
      'value': null,
      'ownerID': null,
      'ownerEntity': null
    });
  }
}
