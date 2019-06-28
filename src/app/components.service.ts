import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private basic_embedUrl = "http://localhost:3000/api/basic_embed";
  private dynamicLoadUrl = "http://localhost:3000/api/dynamicLoad";
  private export2pdfUrl = "http://localhost:3000/api/export2pdf";
  private filterUrl = "http://localhost:3000/api/filter";
  private getDataUrl = "http://localhost:3000/api/getData";

  constructor(private http: HttpClient) { }

  getBasic_embed() {
    return this.http.get<any>(this.basic_embedUrl);
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