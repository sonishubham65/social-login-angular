import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardService } from './dashboard.service'
@Injectable({
  providedIn: 'root'
})
export class Dashboard implements Resolve<any>{

  constructor(private dashboardService:DashboardService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.dashboardService.getProfile().subscribe((result)=>{
      return result['data'];
    });
  }
}
