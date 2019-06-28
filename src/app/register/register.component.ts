import {Component, ElementRef, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: { password: string; email: string };
  
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser(email, pass) {
    this.registerUserData = {
      email: email.value,
      password: pass.value
    }
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['home'])
        },
        err => console.log(err)
      )
  }


}
