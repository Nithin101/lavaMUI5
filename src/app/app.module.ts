import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LavaService } from './lava.service';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { isActiveNav } from './Directives/general.directive';
import { MySharedService } from './Service/MySharedService';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Login' } },
  { path: 'home', component: HomeComponent , data : { title:'Home'} },
  { path: '#/home', component: HomeComponent , data : { title:'Home'} },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    isActiveNav,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ConfirmationPopoverModule .forRoot({
      confirmButtonType: 'danger'
      }),
  ],
  providers: [CookieService, 
             LavaService,
             MySharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
