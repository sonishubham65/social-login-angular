import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getProfile(){
    return this.http.post("/api/account/profile/",{
      access_token:localStorage.getItem('access_token')
    });
  }
}
