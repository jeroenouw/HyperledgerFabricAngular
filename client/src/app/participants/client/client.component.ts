import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ClientService } from './client.service';
import { toPromise } from 'rxjs/operator/toPromise';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  myForm: FormGroup;
  private _allClients;
  private _client;
  private _currentId;
  private _errormessage;

  private _coins;
  private _service;

  displayedColumns = ['clientID', 'name', 'coinsValue', 'serviceValue', 'serviceHours'];
  dataSource = new MatTableDataSource();

  clientID = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  coinsValue = new FormControl('', Validators.required);
  serviceValue = new FormControl('', Validators.required);
  serviceHours = new FormControl('', Validators.required);

  constructor(private _clientService: ClientService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      clientID: this.clientID,
      name: this.name,
      coinsValue: this.coinsValue,
      serviceValue: this.serviceValue,
      serviceHours: this.serviceHours
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  resetForm(): void {
    this.myForm.setValue({
      'clientID': null,
      'name': null,
      'coinsValue': null,
      'serviceValue': null,
      'serviceHours': null
    });
  }

  updateClient(form: any): Promise<any> {
    console.log('update check');
    this._client = {
      $class:
      'org.decentralized.finance.network.Client',
      'name': this.name.value,
      'coins': 'resource:org.decentralized.finance.network.Coins#CO_' + form.get('clientID').value,
      'service': 'resource:org.decentralized.finance.network.Service#SE_' + form.get('clientID').value
    };
    console.log(this._client);
    return this._clientService.updateClient(form.get('clientID').value, this._client)
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

  deleteClient(): Promise<any> {
    return this._clientService.deleteClient(this._currentId)
    .toPromise()
    .then(() => {
      this._errormessage = null;
      const coinsID = 'CO_' + this._currentId;
      this._clientService.deleteCoins(coinsID)
      .toPromise()
      .then(() => {
        this._clientService.deleteService('SE_' + this._currentId)
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
    return this._clientService.getClient(id)
    .toPromise()
    .then((result) => {
      this._errormessage = null;
      const formObject = {
        'clientID': null,
        'name': null,
        'coinsValue': null,
        'serviceValue': null,
        'serviceHours': null
      };

      if (result.clientID) {
        formObject.clientID = result.clientID;
      } else {
        formObject.clientID = null;
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

  loadAll_OnlyClients(): Promise<any> {
    const tempList = [];
    return this._clientService.getAllClients()
    .toPromise()
    .then((result) => {
      this.dataSource.data = result;
      result.forEach(_client => {
        tempList.push(_client);
      });
      this._allClients = tempList;
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
    const clientList = [];
    return this._clientService.getAllClients()
    .toPromise()
    .then((result) => {
      this.dataSource.data = result;
      result.forEach(_client => {
        clientList.push(_client);
      });
    })
    .then(() => {
      for (const client of clientList) {
        console.log('in for loop');
        console.log(client.coins);

        const splitted_coinsID = client.coins.split('#', 2);
        const coinsID = String(splitted_coinsID[1]);
        this._clientService.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            client.coinsValue = result.value;
          }
        });

        const splitted_serviceID = client.service.split('#', 2);
        const serviceID = String(splitted_serviceID[1]);
        console.log(serviceID);
        this._clientService.getService(serviceID)
        .toPromise()
        .then((result) => {
          this._errormessage = null;
          if (result.value) {
            client.serviceValue = result.value;
          }
          if (result.hours) {
            client.serviceUnits = result.hours;
          }
        });
      }
      this._allClients = clientList;
    });
  }

  addClient(form: any): Promise<any> {
    return this.createAssetsClient()
      .then(() => {
        this._errormessage = null;
        this.myForm.setValue({
          'clientID': null,
          'name': null,
          'coinsValue': null,
          'serviceValue': null,
          'serviceHours': null
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

  createAssetsClient(): Promise<any> {
    this._coins = {
      $class:
      'org.decentralized.finance.network.Coins',
      'coinsID': 'CO_' + this.clientID.value,
      'value': this.coinsValue.value,
      'ownerID': this.clientID.value,
      'ownerEntity': 'Client'
    };

    this._service = {
      $class:
      'org.decentralized.finance.network.Service',
      'serviceID': 'SE_' + this.clientID.value,
      'hours': this.serviceHours.value,
      'value': this.serviceValue.value,
      'ownerID': this.clientID.value,
      'ownerEntity': 'Client'
    };

    this._client = {
      $class:
      'org.decentralized.finance.network.Client',
      'clientID': this.clientID.value,
      'name': this.name.value,
      'coins': 'CO_' + this.clientID.value,
      'service': 'SE_' + this.clientID.value,
    };

    return this._clientService.addCoins(this._coins)
    .toPromise()
    .then(() => {
      console.log('create service');
      this._clientService.addService(this._service)
      .toPromise()
      .then(() => {
        console.log('create clients');
        this._clientService.addClient(this._client)
        .toPromise()
        .then(() => {
          console.log('created assets');
          location.reload();
        });
      });
    });
  }
}
