import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { BasicEmbedComponent } from './basic-embed/basic-embed.component';
import { DynamicLoadComponent } from './dynamic-load/dynamic-load.component';
import { FilterComponent } from './filter/filter.component';
import { ExportToPDFComponent } from './export-to-pdf/export-to-pdf.component';
import { GetDataComponent } from './get-data/get-data.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ComponentsService } from './components.service';
import { LoadingSpinnercomponent } from './shared/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'basic_embed', component: BasicEmbedComponent},
  {path: 'dynamicLoad', component: DynamicLoadComponent},
  {path: 'export2pdf', component: ExportToPDFComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'getData', component: GetDataComponent, canActivate: [AuthGuard]},
]
@NgModule({
  declarations: [
    AppComponent,
    BasicEmbedComponent,
    DynamicLoadComponent,
    FilterComponent,
    ExportToPDFComponent,
    GetDataComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LoadingSpinnercomponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true},
    ComponentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
