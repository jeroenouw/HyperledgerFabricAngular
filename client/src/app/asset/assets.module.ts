import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsComponent } from './coins/coins.component';
import { CashComponent } from './cash/cash.component';
import { ServiceComponent } from './service/service.component';

import { CoinsService } from './coins/coins.service';
import { CashService} from './cash/cash.service';
import { ServiceService} from './service/service.service';

@NgModule({
  imports: [
    CommonModule
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
