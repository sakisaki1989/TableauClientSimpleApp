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
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css'],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true}]
})
export class ExportToPDFComponent implements OnInit {
  viz: any;
  res: number;
  constructor(private componentService: ComponentsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const placeholderDiv = document.getElementById('vizContainer');
    const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/Obesity';
// Replace this url with the url of your Tableau dashboard
    this.componentService.getExport2pdfUrl().subscribe(
    res => this.res = res,
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          this.authService.logoutUser();
          this.router.navigate([''])
        }
      }
    }
)
    var options = {
      hideTabs: true,
      width: "1200px",
      height: "650px",
      onFirstInteractive: function() {
        // The viz is now ready and can be safely used.
        console.log('Run this code when the viz has finished     loading.');
      }
    };
// Creating a viz object and embed it in the container div.
    this.viz = new tableau.Viz(placeholderDiv, url, options);
  }

  exportToPDF() {
    this.viz.showExportPDFDialog();
  }

}
