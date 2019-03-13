import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { 
  }
  signUp(jwt,type){
    return this.http.post("/api/account/register/",{
      jwt:jwt,
      type:type
    });
  }
  signIn(_args){
    return this.http.post("/api/account/login/",_args);
  }
}
