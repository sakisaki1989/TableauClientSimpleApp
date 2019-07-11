import {Component, ElementRef, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: {username: string,  password: string, role: string};
  isLoading = false;
  error: string = null;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser(form: NgForm) {
    if(!form.valid){
      return;
    }
    this.registerUserData = {      
      username: form.value.email,
      password: form.value.password,
      role: form.value.role
    };
    this.isLoading = true;
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          this.isLoading = false;
          sessionStorage.setItem('token', res.token)
          this.router.navigate(['home'])
        },
        err => {
          console.log(err)
          this.isLoading = false;
          this.error = 'An error occured!';
        }
      );
      form.reset;
  }


}
