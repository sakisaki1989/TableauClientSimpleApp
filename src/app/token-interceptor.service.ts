import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpParams, HttpHeaders} from '@angular/common/http'
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService){}
  intercept(req, next) {
  let authReq = req;
  if(this.authService.getToken()){ 
      const token = 'Bearer ' + this.authService.getToken();
      authReq = req.clone({ headers : req.headers.set(TOKEN_HEADER_KEY, token)});
      return next.handle(authReq);
  }
  return next.handle(authReq);
  }

}