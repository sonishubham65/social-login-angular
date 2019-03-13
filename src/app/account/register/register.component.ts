import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userType='vendor';
  constructor(private accountService:AccountService, private globalService: GlobalService, private router:Router) { }
  ngOnInit() {
  }

  onToken(token){
    this.accountService.signUp(token,this.userType).subscribe((response)=>{
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
