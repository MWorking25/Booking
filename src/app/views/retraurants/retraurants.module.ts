import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetraurantsRoutingModule } from './retraurants-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent, OrdersComponent],
  imports: [
    CommonModule,
    RetraurantsRoutingModule
  ]
})
export class RetraurantsModule { }
