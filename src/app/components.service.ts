import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private basic_embedUrl = "http://localhost:8080/spring-security-demo/basic_embed";
  private dynamicLoadUrl = "http://localhost:8080/spring-security-demo/dynamicLoad";
  private export2pdfUrl = "http://localhost:8080/spring-security-demo/export2pdf";
  private filterUrl = "http://localhost:8080/spring-security-demo/filter";
  private getDataUrl = "http://localhost:8080/spring-security-demo/getData";


  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  getBasic_embed(ticket: number) {    
    return this.http.get<any>(this.basic_embedUrl + ticket);
  }

  getDynamicLoadUrl() {
    return this.http.get<any>(this.dynamicLoadUrl);
  }

  getExport2pdfUrl() {
    return this.http.get<any>(this.export2pdfUrl);
  }

  getFilterUrl() {
    return this.http.get<any>(this.filterUrl);
  }

  getGetDataUrl() {
    return this.http.get<any>(this.getDataUrl);
  }
}