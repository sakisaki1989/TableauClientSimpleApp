import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var tableau: any;

@Component({
  selector: 'app-dynamic-load',
  templateUrl: './dynamic-load.component.html',
  styleUrls: ['./dynamic-load.component.css'],

})
export class DynamicLoadComponent implements OnInit {
  // now declare an instance var
  res:string[];
  viz: any;
  vizCount: number = 0;
  vizLen: number;

  constructor(private componentService: ComponentsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.componentService.getDynamicLoadUrl().subscribe(
      res =>  {
        this.res = res.url;
        this.vizLen = this.res.length;
        this.createViz(0);
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.authService.logoutUser();
            this.router.navigate([''])
          }
        }
      }
  )
  }
  createViz(vizPlusMinus) {
    const vizDiv = document.getElementById("vizContainer");
      const options = {
        hideTabs: true,
        width: '1200px',
        height: '700px',
      };

    this.vizCount = this.vizCount + vizPlusMinus;

    if (this.vizCount >= this.vizLen) {
      // Keep the vizCount in the bounds of the array index.
      this.vizCount = 0;
    } else if (this.vizCount < 0) {
      this.vizCount = this.vizLen - 1;
    }

    if (this.viz) { // If a viz object exists, delete it.
      this.viz.dispose();
    }

    const vizURL = this.res[this.vizCount];
    this.viz = new tableau.Viz(vizDiv, vizURL, options);
  }
}
