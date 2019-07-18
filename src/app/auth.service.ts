import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './model/user';
import { EncrDecrService } from './encr-decr.service';
import { TrustedAuthService } from './tableau-auth/trusted-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8080/spring-security-demo/registration';
  private loginUrl = 'http://localhost:8080/spring-security-demo/authenticate';
  private target_site = 'TrustedAuthSiteName';
  private ticket: number;
  public user = new Subject<User>();

  constructor(private http: HttpClient,
              private router: Router,
              private EncrDecr: EncrDecrService,
              private trustedAuth: TrustedAuthService) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user).pipe(tap(resData => {
      this.handleAuthetication(resData.user.username, resData.user.users_id, resData.user.roles.role, resData.user.token)
    }));
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user).pipe(tap(resData => {
      this.handleAuthetication(resData.user.username, resData.user.users_id, resData.user.roles.role, resData.user.token)
    }));
  }

  logoutUser() {
    sessionStorage.removeItem('user');
    //sessionStorage.removeItem('role');
    this.router.navigate(['']);
  }

  getToken() {    
    let token = null;
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user !== null)token = user._token;
    return token;
  }


  loggedIn() {
    return !!sessionStorage.getItem('user');
  }

  getTableauToken() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user._tableauToken;
 }

  getRole() {
     let user = JSON.parse(sessionStorage.getItem('user'));
     const decrypted = this.EncrDecr.get('123456$#@$^@1ERF',user._role);
     return decrypted;
  }

  getSSO() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log();
    
    const decrypted = this.EncrDecr.get('123456$#@$^@1ERF',user.user_id);
    return decrypted;
 }

  handleAuthetication(username:string, userId: string, role: string, token: string) {
    this.trustedAuth.requestTicket(username, "e.g. https://server_name", this.target_site ).subscribe(
      (res)=>{
        this.ticket = res;
      },
      (err)=>{
        this.ticket = -1;
        console.log(this.ticket); 
      }
    )
    const user = new User(
    this.EncrDecr.set('123456$#@$^@1ERF', username),
    this.EncrDecr.set('123456$#@$^@1ERF', userId), 
    this.EncrDecr.set('123456$#@$^@1ERF', role),
    token,
    this.ticket.toString()
    );
    
   
    sessionStorage.setItem('user', JSON.stringify(user));
    
    this.user.next(user);
  }
}
