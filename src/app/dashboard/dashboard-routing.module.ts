import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { Dashboard } from './resolver.service'
import { PasswordComponent } from './password/password.component';
const routes: Routes = [{
  path:'',
  component:IndexComponent,
  resolve:{result:Dashboard}
},
{
  path:'password',
  component:PasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { 
  constructor(private route:ActivatedRoute){
    
  }
  ngOnInit() {
    this.route.data
      .subscribe((result) => {
        console.log(result,'--->');
      });
  }
  
}
