import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  user: User;
  private userSub: Subscription;
  constructor(private _authService: AuthService){}
  
  ngOnInit() {
   }

  ngOnDestroy(): void {
  }

}
