import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var tableau: any;

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {
  viz: any;
  res: number;
  sheet: any;
  table: any;
  constructor(private componentService: ComponentsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const containerDiv = document.getElementById('vizContainer');
    this.componentService.getGetDataUrl().subscribe(
      res => {
        this.res = res.url
        const options = {
          hideTabs: true,
          hideToolbar: true,
        };
        this.viz = new tableau.Viz(containerDiv, this.res, options);
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            window.alert('401 Unauthorized request')
            this.authService.logoutUser();
            this.router.navigate([''])
          } else {console.log(err)
          }
        }
      }
    );
  }
  getUnderlyingData(){
    this.sheet = this.viz.getWorkbook().getActiveSheet().getWorksheets().get('Storm Map Sheet');
    // If the active sheet is not a dashboard, then you can just enter:
    // viz.getWorkbook().getActiveSheet();
    const options = {
      maxRows: 10, // Max rows to return. Use 0 to return all rows
      ignoreAliases: false,
      ignoreSelection: true,
      includeAllColumns: false
    };

    this.sheet.getUnderlyingDataAsync(options).then((t: any) => {
      this.table = t;
      const tgt = document.getElementById('dataTarget');
      tgt.innerHTML = '<h4>Underlying Data:</h4><p>' + JSON.stringify(this.table.getData()) + '</p>';
    });
  }
  }

