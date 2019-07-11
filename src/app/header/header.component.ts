import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { EncrDecrService } from '../encr-decr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  user: User;
  private userSub: Subscription;
  constructor(private _authService: AuthService,
              private EncrDecr: EncrDecrService){}
              
  getRole() {
    const encryptedRole = sessionStorage.getItem('role');
    const decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encryptedRole);
    return decrypted;
  }
  ngOnInit() {
   }

  ngOnDestroy(): void {
  }

}
