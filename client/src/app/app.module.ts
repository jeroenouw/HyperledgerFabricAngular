import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { MatButtonModule, MatCheckboxModule, MatMenuModule,
         MatInputModule, MatSnackBarModule, MatToolbarModule,
         MatCardModule, MatIconModule } from '@angular/Material';

import { ParticipantsModule } from './participants/participants.module';
import { AssetsModule } from './asset/assets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { Configuration } from './configuration';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule,
    MatInputModule, MatSnackBarModule, MatToolbarModule,
    MatCardModule, MatIconModule,
    ParticipantsModule,
    AssetsModule,
    TransactionsModule,
    SharedModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
