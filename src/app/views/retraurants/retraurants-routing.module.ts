import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'list',component:ListComponent, data: {
    title: 'Restraurants'
  }},
  {path:'orders',component:OrdersComponent,data: {
    title: 'Restraurants Orders'
  }},
  {path:'details',component:DetailsComponent,data: {
    title: 'Restraurants Details'
  }}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetraurantsRoutingModule { }
