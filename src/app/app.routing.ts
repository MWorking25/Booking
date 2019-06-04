import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'buses',
        loadChildren: './views/buses/buses.module#BusesModule'
      },
      {
        path: 'cabs',
        loadChildren: './views/cabs/cabs.module#CabsModule'
      },
      {
        path: 'hotels',
        loadChildren: './views/hotels/hotels.module#HotelsModule'
      },
      {
        path: 'experiences',
        loadChildren: './views/experiences/experiences.module#ExperiencesModule'
      },
      {
        path: 'masters',
        loadChildren: './views/masters/masters.module#MastersModule'
      },
      {
        path: 'restraurants',
        loadChildren: './views/retraurants/retraurants.module#RetraurantsModule'
      },
      {
        path: 'reports',
        loadChildren: './views/reports/reports.module#ReportsModule'
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
