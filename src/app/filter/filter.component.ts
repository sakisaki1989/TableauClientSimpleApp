import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
declare var tableau: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  viz: any;
  res: number;
  constructor(private componentService: ComponentsService, private router: Router) { }

  ngOnInit() {
    const containerDiv = document.getElementById('vizContainer');
    const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/College';
    this.componentService.getFilterUrl().subscribe(
      res => this.res = res,
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.router.navigate([''])
          }else {console.log(err)
          }
        }
      }
  )
    const options = {
        'Academic Year': '',
        hideTabs: true
      };

    this.viz = new tableau.Viz(containerDiv, url, options);
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
