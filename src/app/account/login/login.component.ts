import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType='vendor';
  constructor(private accountService:AccountService, private globalService:GlobalService,private router:Router,private fb: FormBuilder) { }

  form = this.fb.group({
    email: ['sonishubham65@gmail.com',Validators.required],
    phone: ['+919782970790',Validators.required],
    password: ['Pass@123',Validators.required],
  });
  ngOnInit() {
  }
  validate(){
    if(this.form.valid){
      let args = {
        phone : this.phone.value,
        password  : this.password.value,
        type:this.userType,
        device_type : 'web',
      
      }
      this.login(args);
    }
    
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
    this.login(args);
  }
  login(args){
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
  get phone(){
    return this.form.controls['phone'];
  }
  get password(){
    return this.form.controls['password'];
  }
}
