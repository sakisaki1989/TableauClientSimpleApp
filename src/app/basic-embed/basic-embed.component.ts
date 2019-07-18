import { Component, OnInit } from '@angular/core';
import 'tableau-api';
import { ComponentsService } from '../components.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TrustedAuthService } from '../tableau-auth/trusted-auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginComponent } from '../login/login.component';
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
  req: { username: string, target_site: string };
  ticket: number;

  constructor(
    private componentService: ComponentsService,
    private router: Router,
    private authService: AuthService) { }

  // this code is verbatim from Tableau API
  // just replace the url with my Viz in public
  ngOnInit() {

    const placeholderDiv = document.getElementById('vizContainer');
    const options = {
      hideTabs: true,
      width: '1200px',
      height: '800px',
      onFirstInteractive: () => {
        // The viz is now ready and can be safely used.
        console.log('Run this code when the viz has finished loading.');
      }
    };
    this.ticket = this.authService.getTableauToken();
    this.componentService.getBasic_embed(this.ticket).subscribe(
      (res) => {
        this.res = res.url
        // Creating a viz object and embed it in the container div.
        this.viz = new tableau.Viz(placeholderDiv, this.res, options);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logoutUser();
            this.router.navigate([''])
          }
        }
      }
    )
  }
}
