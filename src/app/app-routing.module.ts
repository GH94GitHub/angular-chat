import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path:'',
        component: HomeComponent
      },
      // {
      //   path:'',
      //   component: LandingComponent
      // },
      // {
      //   path: 'create-profile',
      //   component: CreateProfileComponent
      // },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
