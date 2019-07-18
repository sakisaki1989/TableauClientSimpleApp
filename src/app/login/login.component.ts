import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: {username: string,  password: string};
  isLoading = false;
  error: string = null;
  
  
  constructor(private _auth: AuthService,
              private _router: Router) {}

  ngOnInit() {
  }

  loginUser (form: NgForm) {
    if(!form.valid){
      return;
    }
    this.loginUserData = {
      username: form.value.email,
      password: form.value.password
    };
    this.isLoading = true;
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        //sessionStorage.setItem('token', res.user.token)
        this._router.navigate(['home'])
        this.isLoading = false;
      },
      err => {
      console.log(err)
      this.error = 'An error occured!';
      this.isLoading = false;
      }
    ); 
    form.reset;
  }

}