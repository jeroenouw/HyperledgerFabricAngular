import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Home
import { HomeComponent } from './home/home.component';

// Assets
import { CoinsComponent } from './asset/coins/coins.component';
import { CashComponent } from './asset/cash/cash.component';
import { ServiceComponent } from './asset/service/service.component';

// Freelancers
import { FreelancerComponent } from './participants/freelancer/freelancer.component';
import { ClientComponent } from './participants/client/client.component';
import { BankComponent } from './participants/bank/bank.component';

// Transactions
import { AllTransactionsComponent } from './transactions/all-transactions/all-transactions.component';
import { TransactionFbComponent } from './transactions/transaction-fb/transaction-fb.component';
import { TransactionFfComponent } from './transactions/transaction-ff/transaction-ff.component';
import { TransactionFcComponent } from './transactions/transaction-fc/transaction-fc.component';

const ROUTES: Routes = [
  // Home
  { path: '', component: HomeComponent, pathMatch : 'full' },

  // Assets
  { path: 'assets/coins', component: CoinsComponent },
  { path: 'assets/service', component: ServiceComponent },
  { path: 'assets/cash', component: CashComponent },

  // Participants
  { path: 'participants/freelancer', component: FreelancerComponent },
  { path: 'participants/bank', component: BankComponent },
  { path: 'participants/client', component: ClientComponent },

  // Transactions
  { path: 'transaction/fb', component: TransactionFbComponent },
  { path: 'transaction/fc', component: TransactionFcComponent },
  { path: 'transaction/ff', component: TransactionFfComponent },
  { path: 'transactions/all', component: AllTransactionsComponent },

  // Other
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
