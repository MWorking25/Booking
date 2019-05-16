import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreasComponent } from './areas/areas.component';
import { MembersComponent } from './members/members.component';
import { OffersComponent } from './offers/offers.component';
import { TrainsComponent } from './trains/trains.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'area',pathMatch:'full'},
  {path:'area',component:AreasComponent, data: {
    title: 'Areas'
  }},
  {path:'members',component:MembersComponent,data: {
    title: 'Members'
  }},
  {path:'offers',component:OffersComponent,data: {
    title: 'Offers'
  }},
  {path:'trains',component:TrainsComponent,data: {
    title: 'Trains'
  }},
  {path:'users',component:UsersComponent,data: {
    title: 'Users'
  }}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
