import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit, OnDestroy {

  mode = '';
  routerSubscription;
  constructor(private route:ActivatedRoute) { 
    this.routerSubscription = this.route.params.subscribe(params => {
      this.mode = params['mode'];
    });
  
  }

  ngOnInit() {
    
  }
  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }

}
