import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LavaService } from './Service/lava.service';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { isActiveNav,pieGraph } from './Directives/general.directive';
import { MySharedService } from './Service/MySharedService';
import { GlobalComponent } from './global/global.component';
import { UsersettingComponent } from './usersetting/usersetting.component';
import { MomentComponent } from './moment/moment.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch : 'full'},
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  {path: 'lava', component: HeaderComponent, data: { title: 'lava' },
  children : [
          { path: 'home', component: HomeComponent },
          {path: 'global', component: GlobalComponent},
          {path: 'usersettings', component: UsersettingComponent},
          {path: 'moment', component: MomentComponent}
  ]}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    MomentComponent,
    isActiveNav,
    pieGraph,
    GlobalComponent,
    UsersettingComponent,
    MomentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    Ng2SearchPipeModule,
    Ng2FilterPipeModule,
    NgbModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circle,
      backdropBackgroundColour: 'rgba(255, 255, 255, .55)',
    }),
    PerfectScrollbarModule
  ],
  providers: [CookieService,
    LavaService,
    MySharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }