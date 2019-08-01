import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userType='vendor';
  constructor(private accountService:AccountService, private globalService: GlobalService, private router:Router,private fb: FormBuilder,private fireAuth:AngularFireAuth) { }

  form = this.fb.group({
    firstname: ['Shubham',Validators.required],
    lastname: ['soni',Validators.required],
    phone: ['+919782970790',Validators.required],
    otp: ['123456',Validators.required],
  });
  captcha;
  confirmation;
  ngOnInit() {
    this.captcha = new auth.RecaptchaVerifier('recaptcha-container',{
      'size': 'invisible',
    });
    this.captcha.render();
  }
  sendOTP(){
    
    this.fireAuth.auth.signInWithPhoneNumber(this.phone.value, this.captcha)
    .then(result => {
      this.confirmation = result;
      this.accountService.signUp({

      });
    })
    .catch( error => {
      console.log(error);
      this.confirmation = null;
    });
  }
  validate(){
    this.confirmation.confirm(this.otp.value)
    .then( result => {
      let token = result.user.ra;
      this.register({
        firstname:this.firstname.value,
        lastname:this.lastname.value,
        jwt:token,
        type:this.userType
      })
    })
    .catch( error => {
      console.log(error, "Incorrect code entered?")
      this.confirmation = null;
    });
  }
  onToken(token){
    this.register({jwt:token,type:this.userType})
  }
  register(_args){
    this.accountService.signUp(_args).subscribe((response)=>{
      if(response['status']=='success'){
        localStorage.setItem('access_token',response['data']['access_token'])
        this.globalService.profile = response['data']['profile'];
        this.router.navigate(['/dashboard']);
      };
    },(err)=>{
      console.log(err);
    });
  }
  
  get firstname(){
    return this.form.controls['firstname'];
  }
  get lastname(){
    return this.form.controls['lastname'];
  }
  get phone(){
    return this.form.controls['phone'];
  }
  get otp(){
    return this.form.controls['otp'];
  }

}
