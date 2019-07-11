import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var tableau: any;

@Component({
  selector: 'app-basic-embed',
  templateUrl: './basic-embed.component.html',
  styleUrls: ['./basic-embed.component.css']
})
export class BasicEmbedComponent implements OnInit {
  // now declare an instance var
  viz: any;
  res: string;

  constructor(private componentService: ComponentsService, private router: Router, private authService: AuthService) {
    console.log(this.res);
  }

  // this code is verbatim from Tableau API
  // just replace the url with my Viz in public
  ngOnInit() {

    const placeholderDiv = document.getElementById('vizContainer');
    const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
// Replace this url with the url of your Tableau dashboard
    this.componentService.getBasic_embed().subscribe(
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

    
    const options = {
      hideTabs: true,
      width: '1200px',
      height: '800px',
      onFirstInteractive: () => {
        // The viz is now ready and can be safely used.
        console.log('Run this code when the viz has finished     loading.');
      }
    };
// Creating a viz object and embed it in the container div.
    this.viz = new tableau.Viz(placeholderDiv, url, options);
  }
}
