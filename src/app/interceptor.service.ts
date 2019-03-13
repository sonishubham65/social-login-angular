import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const dupReq = req.clone({ url: environment.api+req.url });
      return next.handle(dupReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if(event.body.status=='error'){
            console.log(event.body.data.message,event.body)
          }
          if(event.body.data.message){
            this.snackBar.open(event.body.data.message,'close',{duration:2000});
          }
        }
        return event;
    }))
  }
}