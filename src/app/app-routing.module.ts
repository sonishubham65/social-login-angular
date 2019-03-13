import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'
const routes: Routes = [{
  path : 'account',
  loadChildren: './account/account.module#AccountModule'
},{
  path : 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule',
  canActivate: [AuthService]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthService]
})
export class AppRoutingModule { }
