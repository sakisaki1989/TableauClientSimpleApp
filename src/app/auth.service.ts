import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { EncrDecrService } from './encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8080/spring-security-demo/registration';
  private loginUrl = 'http://localhost:8080/spring-security-demo/authenticate';
  
  
  public user = new Subject<User>();
  role: string = null;
  constructor(private http: HttpClient,
              private router: Router,
              private EncrDecr: EncrDecrService) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user).pipe(tap(resData => {
      this.handleAuthetication(resData.user.username, resData.user.id, resData.user.role, resData.user.token)
    }));
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user).pipe(tap(resData => {
      this.handleAuthetication(resData.user.username, resData.user.id, resData.user.role, resData.user.token)
    }));
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.router.navigate(['']);
  }

  getToken() {    
    return sessionStorage.getItem('token');
  }


  loggedIn() {
    return !!sessionStorage.getItem('token');
  }
  getRole() {
    return this.role;
  }

  handleAuthetication(username:string, userId: string,role: string, token: string) {
    const user = new User(username, userId, role,  token);
    this.role = role;
    const encryptedRole = this.EncrDecr.set('123456$#@$^@1ERF', this.role);
    sessionStorage.setItem('role', encryptedRole);
    
    this.user.next(user);
  }
}
