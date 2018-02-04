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
  { path: '', component: HomeComponent },

  // Asset
  { path: 'Coins', component: CoinsComponent },
  { path: 'Service', component: ServiceComponent },
  { path: 'Cash', component: CashComponent },

  // Participant
  { path: 'Freelance', component: FreelancerComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'Client', component: ClientComponent },

  // Transaction
  { path: 'Transaction/fb', component: TransactionFbComponent },
  { path: 'Transaction/fc', component: TransactionFcComponent },
  { path: 'Transaction/ff', component: TransactionFfComponent },
  { path: 'AllTransactions', component: AllTransactionsComponent },

  // Other
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
