import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { numbersReducer } from './redux/redux.reducer';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, StoreModule.forRoot({ numbers: numbersReducer })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
