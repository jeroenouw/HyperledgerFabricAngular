import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FreelancerService } from './freelancer.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent implements OnInit {
  myForm: FormGroup;
  private _allFreelancers;
  private _freelancer;
  private _currentId;
  private _errormessage;

  private _coins;
  private _service;
  private _cash;

  displayedColumns = ['freelancerID', 'firstName', 'lastName', 'coinsValue', 'serviceValue', 'serviceHours', 'cashValue', 'cashCurrency'];
  dataSource = new MatTableDataSource();

  freelancerID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  coinsValue = new FormControl('', Validators.required);
  serviceValue = new FormControl('', Validators.required);
  serviceHours = new FormControl('', Validators.required);
  cashValue = new FormControl('', Validators.required);
  cashCurrency = new FormControl('', Validators.required);

  constructor(private _freelancerService: FreelancerService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      freelancerID: this.freelancerID,
      firstName: this.firstName,
      lastName: this.lastName,
      coinsValue: this.coinsValue,
      serviceValue: this.serviceValue,
      serviceHours: this.serviceHours,
      cashValue: this.cashValue,
      cashCurrency: this.cashCurrency
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  resetForm(): void {
    this.myForm.setValue({
      'freelancerID': null,
      'firstName': null,
      'lastName': null,

      'coinsValue': null,
      'serviceValue': null,
      'serviceHours': null,
      'cashValue': null,
      'cashCurrency': null
    });
  }

  updateFreelancer(form: any): Promise<any> {
    console.log('update check');
    this._freelancer = {
      $class:
      'org.decentralized.finance.network.Freelancer',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'coins': 'resource:org.decentralized.finance.network.Coins#CO_' + form.get('freelancerID').value,
      'cash': 'resource:org.decentralized.finance.network.Cash#CA_' + form.get('freelancerID').value,
      'service': 'resource:org.decentralized.finance.network.Service#SE_' + form.get('freelancerID').value
    };
    console.log(this._freelancer);
    return this._freelancerService.updateFreelancer(form.get('freelancerID').value, this._freelancer)
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

  deleteFreelancer(): Promise<any> {
    return this._freelancerService.deleteFreelancer(this._currentId)
    .toPromise()
    .then(() => {
      this._errormessage = null;
      const coinsID = 'CO_' + this._currentId;
      this._freelancerService.deleteCoins(coinsID)
      .toPromise()
      .then(() => {
        this._freelancerService.deleteService('SE_' + this._currentId)
        .toPromise()
        .then(() => {
          this._freelancerService.deleteCash('CA_' + this._currentId)
          .toPromise()
          .then(() => {
            console.log('Deleted');
          });
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
    return this._freelancerService.getFreelancer(id)
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      const formObject = {
        'freelancerID': null,
        'firstName': null,
        'lastName': null,
        'coinsValue': null,
        'serviceValue': null,
        'serviceHours': null,
        'cashValue': null,
        'cashCurrency': null
      };

      if (result.freelancerID) {
        formObject.freelancerID = result.freelancerID;
      } else {
        formObject.freelancerID = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
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

  loadAll_OnlyFreelancers(): Promise<any> {
    const tempList = [];
    return this._freelancerService.getAllFreelancers()
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      result.forEach(_freelancer => {
        tempList.push(_freelancer);
      });
      this._allFreelancers = tempList;
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
    const freelancerList = [];
    return this._freelancerService.getAllFreelancers()
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      result.forEach(_freelancer => {
        freelancerList.push(_freelancer);
      });
    })
    .then(() => {
      for (const freelancer of freelancerList) {
        console.log('in for loop');
        console.log(freelancer.coins);

        const splitted_coinsID = freelancer.coins.split('#', 2);
        const coinsID = String(splitted_coinsID[1]);
        this._freelancerService.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            freelancer.coinsValue = result.value;
          }
        });

        const splitted_serviceID = freelancer.service.split('#', 2);
        const serviceID = String(splitted_serviceID[1]);
        console.log(serviceID);
        this._freelancerService.getService(serviceID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            freelancer.serviceValue = result.value;
          }
          if (result.hours) {
            freelancer.serviceUnits = result.hours;
          }
        });

        const splitted_cashID = freelancer.cash.split('#', 2);
        const cashID = String(splitted_cashID[1]);
        console.log(cashID);
        this._freelancerService.getCash(cashID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            freelancer.cashValue = result.value;
          }
          if (result.currency) {
            freelancer.cashCurrency = result.currency;
          }
        });
      }
      this._allFreelancers = freelancerList;
    });
  }

  addFreelancer(form: any): Promise<any> {
    return this.createAssetsFreelancer()
      .then(() => {
        this._errormessage = null;
        this.myForm.setValue({
          'freelancerID': null,
          'firstName': null,
          'lastName': null,
          'coinsValue': null,
          'serviceValue': null,
          'serviceHours': null,
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

  createAssetsFreelancer(): Promise<any> {
    this._coins = {
      $class:
      'org.decentralized.finance.network.Coins',
      'coinsID': 'CO_' + this.freelancerID.value,
      'value': this.coinsValue.value,
      'ownerID': this.freelancerID.value,
      'ownerEntity': 'Freelancer'
    };

    this._service = {
      $class:
      'org.decentralized.finance.network.Service',
      'serviceID': 'SE_' + this.freelancerID.value,
      'hours': this.serviceHours.value,
      'value': this.serviceValue.value,
      'ownerID': this.freelancerID.value,
      'ownerEntity': 'Freelancer'
    };

    this._cash = {
      $class:
      'org.decentralized.finance.network.Cash',
      'cashID': 'CA_' + this.freelancerID.value,
      'currency': this.cashCurrency.value,
      'value': this.cashValue.value,
      'ownerID': this.freelancerID.value,
      'ownerEntity': 'Freelancer'
    };

    this._freelancer = {
      $class:
      'org.decentralized.finance.network.Freelancer',
      'freelancerID': this.freelancerID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'coins': 'CO_' + this.freelancerID.value,
      'cash': 'CA_' + this.freelancerID.value,
      'service': 'SE_' + this.freelancerID.value,
    };

    return this._freelancerService.addCoins(this._coins)
    .toPromise()
    .then(() => {
      console.log('create service');
      this._freelancerService.addService(this._service)
      .toPromise()
      .then(() => {
        console.log('create cash');
        this._freelancerService.addCash(this._cash)
        .toPromise()
        .then(() => {
          console.log('create freelancers');
          this._freelancerService.addFreelancer(this._freelancer)
          .toPromise()
          .then(() => {
           console.log('created assets');
           location.reload();
          });
        });
      });
    });
  }
}
