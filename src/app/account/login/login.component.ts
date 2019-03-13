import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType='vendor';
  constructor(private accountService:AccountService, private globalService:GlobalService,private router:Router) { }

  ngOnInit() {
  }

  onToken(token){
    var args = {
      email : '',
      phone : '',
      password : '',
      type : this.userType,
      jwt : token,
      device_type : 'web',
      device_token : '',
    }
    this.accountService.signIn(args).subscribe((response)=>{
      if(response['status']=='success'){
        localStorage.setItem('access_token',response['data']['access_token'])
        this.globalService.profile = response['data']['profile'];
        this.router.navigate(['/dashboard']);
      };
    },(err)=>{
      console.log(err);
    });
  }
}
