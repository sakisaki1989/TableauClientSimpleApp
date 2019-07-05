import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector){}
  intercept(req, next) {
    const login = '/authenticate';
    const registration = '/registration';
    let authService = this.injector.get(AuthService);
     console.log(req.url.search(login));
     console.log(req.url.search(registration));
    if (req.url.search(login) !== -1 && req.url.search(registration) === -1 ) {
        req = req.clone(
           {
              headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
           }
         );
    }
    return next.handle(req);
    
  }

}