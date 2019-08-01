import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { 
  }
  signUp(_args){
    return this.http.post("/api/account/register/",_args);
  }
  signIn(_args){
    return this.http.post("/api/account/login/",_args);
  }
}
