import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';

import { CoinsComponent } from './asset/coins/coins.component';
import { CashComponent } from './asset/cash/cash.component';
import { ServiceComponent } from './asset/service/service.component';

import { FreelancerComponent } from './participants/freelancer/freelancer.component';
import { ClientComponent } from './participants/client/client.component';
import { BankComponent } from './participants/bank/bank.component';

import { AllTransactionsComponent } from './transactions/all-transactions/all-transactions.component';
import { TransactionFbComponent } from './transactions/transaction-fb/transaction-fb.component';
import { TransactionFfComponent } from './transactions/transaction-ff/transaction-ff.component';
import { TransactionFcComponent } from './transactions/transaction-fc/transaction-fc.component';

const ROUTES: Routes = [
  // Home
  { path: '', component: HomeComponent, pathMatch : 'full' },

  // Asset
  { path: 'coins', component: CoinsComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'cash', component: CashComponent },

  // Participant
  { path: 'freelance', component: FreelancerComponent },
  { path: 'bank', component: BankComponent },
  { path: 'client', component: ClientComponent },

  // Transaction
  { path: 'transaction/fb', component: TransactionFbComponent },
  { path: 'transaction/fc', component: TransactionFcComponent },
  { path: 'transaction/ff', component: TransactionFfComponent },
  { path: 'allTransactions', component: AllTransactionsComponent },

  // Other
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
