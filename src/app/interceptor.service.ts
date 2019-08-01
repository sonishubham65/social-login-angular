import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router:Router) {
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const dupReq = req.clone({ url: environment.api+req.url });
      return next.handle(dupReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let body = event.body;
          if(body.status=='error'){
            if(body.data.code=='unauth'){
              this.router.navigate(['account/sign/in']);
            }
            
          }
          if(body.data.message){
            this.snackBar.open(body.data.message,'close',{duration:2000});
          }
        }
        return event;
    }))
  }
}