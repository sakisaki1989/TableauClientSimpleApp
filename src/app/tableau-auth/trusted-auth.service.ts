import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrustedAuthService {
  req: {username: string,  target_site: string};

  constructor(private http: HttpClient) { }

  public requestTicket(sso: string, server: string, site:string)
  {

          //Assign parameters and values
          this.req = {username: sso, target_site: site}

          //Encode Content

          //POST request
          return this.http.post<any>(server, this.req);
  }

  public addTicket (ticket:string, reportLink:string)
  {
      //Add ticket parameter with ticket value. I'm using </object> as my keyword to find and replace
      const addedTicket = reportLink.replace("</object>", "<param name='ticket' value='" + ticket + "' /></object>");
      return addedTicket;
  }
}
