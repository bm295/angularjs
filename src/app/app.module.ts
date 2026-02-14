import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { InventoryStatusComponent } from './components/inventory-status/inventory-status.component';
import { WebInfoComponent } from './components/web-info/web-info.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { LegacyPagesComponent } from './components/legacy-pages/legacy-pages.component';

const routes: Routes = [
  { path: '', component: HomeDashboardComponent },
  { path: 'legacy-pages', component: LegacyPagesComponent },
  { path: 'legacy-pages/webinfo', component: WebInfoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderFormComponent,
    PaymentFormComponent,
    InventoryStatusComponent,
    WebInfoComponent,
    HomeDashboardComponent,
    LegacyPagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
