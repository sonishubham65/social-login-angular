import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private router:Router,private fb: FormBuilder) { }
  form = this.fb.group({
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required],
  })
  ngOnInit() {
  }
  update(){
    if(this.form.valid){
      this.dashboardService.updatePassword(this.password.value,this.confirmPassword.value).subscribe((res)=>{
        this.form.reset;
      })
    }
    
  }
  get password(){
    return this.form.controls['password'];
  }
  get confirmPassword(){
    return this.form.controls['confirmPassword'];
  }
}

