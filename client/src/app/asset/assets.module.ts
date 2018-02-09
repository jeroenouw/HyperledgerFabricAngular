import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatCardModule, MatPaginatorModule,
         MatIconModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { CoinsComponent } from './coins/coins.component';
import { CashComponent } from './cash/cash.component';
import { ServiceComponent } from './service/service.component';

import { CoinsService } from './coins/coins.service';
import { CashService} from './cash/cash.service';
import { ServiceService} from './service/service.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatInputModule, MatCardModule, MatPaginatorModule,
    MatIconModule, MatTableModule, MatCheckboxModule,
    ReactiveFormsModule
  ],
  declarations: [
    CoinsComponent,
    CashComponent,
    ServiceComponent
  ],
  providers: [
    CoinsService,
    CashService,
    ServiceService
  ],
  exports: [
    CoinsComponent,
    CashComponent,
    ServiceComponent
  ]
})
export class AssetsModule { }
