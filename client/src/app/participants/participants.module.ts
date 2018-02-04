import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerComponent } from './freelancer/freelancer.component';
import { ClientComponent } from './client/client.component';
import { BankComponent } from './bank/bank.component';

import { FreelancerService } from './freelancer/freelancer.service';
import { ClientService } from './client/client.service';
import { BankService } from './bank/bank.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FreelancerComponent,
    ClientComponent,
    BankComponent
  ],
  providers: [
    FreelancerService,
    ClientService,
    BankService
  ],
  exports: [
    FreelancerComponent,
    ClientComponent,
    BankComponent
  ]
})
export class ParticipantsModule { }
