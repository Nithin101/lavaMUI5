import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2FilterPipeModule  } from 'ng2-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LavaService } from './lava.service';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { isActiveNav } from './Directives/general.directive';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Login' } },
  { path: 'home', component: HomeComponent , data : { title:'Home'} }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    isActiveNav
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ConfirmationPopoverModule .forRoot({
      confirmButtonType: 'danger'
    }),
    Ng2SearchPipeModule,
    Ng2FilterPipeModule,
    LoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
     
  })
    NgbModule.forRoot()
  ],
  providers: [CookieService, 
             LavaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
