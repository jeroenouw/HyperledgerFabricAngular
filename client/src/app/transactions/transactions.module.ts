import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatCardModule, MatPaginatorModule,
         MatIconModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { TransactionFbComponent } from './transaction-fb/transaction-fb.component';
import { TransactionFfComponent } from './transaction-ff/transaction-ff.component';
import { TransactionFcComponent } from './transaction-fc/transaction-fc.component';

import { AllTransactionsService } from './all-transactions/all-transactions.service';
import { TransactionFbService } from './transaction-fb/transaction-fb.service';
import { TransactionFcService } from './transaction-fc/transaction-fc.service';
import { TransactionFfService } from './transaction-ff/transaction-ff.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatInputModule, MatCardModule, MatPaginatorModule,
    MatIconModule, MatTableModule, MatCheckboxModule,
    ReactiveFormsModule
  ],
  declarations: [
    AllTransactionsComponent,
    TransactionFbComponent,
    TransactionFfComponent,
    TransactionFcComponent
  ],
  providers: [
    AllTransactionsService,
    TransactionFbService,
    TransactionFcService,
    TransactionFfService
  ],
  exports: [
    AllTransactionsComponent,
    TransactionFbComponent,
    TransactionFfComponent,
    TransactionFcComponent
  ]
})
export class TransactionsModule { }
