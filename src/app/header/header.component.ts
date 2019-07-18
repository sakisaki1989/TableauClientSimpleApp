import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { EncrDecrService } from '../encr-decr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  private userSub: Subscription;
  constructor(private _authService: AuthService,
              private EncrDecr: EncrDecrService){}
              
  getRole() {
   return this._authService.getRole();
  }
  ngOnInit() {
   }

  ngOnDestroy(): void {
  }

}
