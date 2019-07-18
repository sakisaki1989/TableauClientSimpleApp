import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenInterceptorService } from '../token-interceptor.service';
import { AuthService } from '../auth.service';
declare var tableau: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true}]
})
export class FilterComponent implements OnInit {
  viz: any;
  res: number;
  constructor(private componentService: ComponentsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const containerDiv = document.getElementById('vizContainer');
    this.componentService.getFilterUrl().subscribe(
      res => {
        this.res = res.url
        const options = {
          'Academic Year': '',
          hideTabs: true
        };
      this.viz = new tableau.Viz(containerDiv, this.res, options);
    },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.authService.logoutUser();
            this.router.navigate([''])
          }else {console.log(err)
          }
        }
      }
  )

  }
  yearFilter(year) {
    const sheet = this.viz.getWorkbook().getActiveSheet();
    if (year === '') {
      sheet.clearFilterAsync('Academic Year');
    } else {
      sheet.applyFilterAsync('Academic Year', year, tableau.FilterUpdateType.REPLACE);
    }
  }
}
