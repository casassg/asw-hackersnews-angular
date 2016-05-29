import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,  Router } from '@angular/router-deprecated';

import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { UserDetailComponent } from './user/user-detail.component';
import { MeDetailComponent } from './user/me.component';
import { HeroService }         from './hero.service';
import { ContributionService } from './contribution/contribution.service';
import { ContributionDetailComponent } from './contribution/contribution-detail.component';
import { NewestComponent } from './contribution/newest.component';
import { AsksComponent } from './contribution/asks.component';
import { UserService }         from './user/user.service';
import { TokenKeeper }         from './user/token.keeper';
import { setCookie, getCookie }         from './user/cookies.helper';

@Component({
  selector: 'my-app',

  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Newest']">Newest</a>
      <a [routerLink]="['Asks']">Asks</a>
      <a [routerLink]="['ContributionDetail', {'id':'5'}]">Contribution 5 (test)</a>
      <a [routerLink]="['ContributionDetail', {'id':'1'}]">Contribution 1 (test)</a>
      <a [routerLink]="['UserDetail',{id:1}]">Usuari 1 (test)</a>
      <a *ngIf="loggedIn" [routerLink]="['MeDetail']">Me</a>
      <a *ngIf="!loggedIn" [href]='login_url'>Login</a>
      <a *ngIf="loggedIn" (click)='logout()'>Logout</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    ContributionService,
    UserService,
    TokenKeeper,
  ]
})
@RouteConfig([
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
  { path: '/user/:id',     name: 'UserDetail',     component: UserDetailComponent },
  { path: '/me',     name: 'MeDetail',     component: MeDetailComponent},
  { path: '/contribution/:id', name: 'ContributionDetail', component: ContributionDetailComponent },
  { path: '/newest', name: 'Newest', component: NewestComponent },
  { path: '/asks', name: 'Asks', component: AsksComponent }
])

export class AppComponent  implements OnInit {
  

  constructor(private router: Router, private keeper: TokenKeeper) {
  }
  title = 'Hackers News';
  host = window.location.host;
  login_url = 'http://hackersnews.herokuapp.com/angular?redirect_url=http://'+this.host;
  loggedIn = false;

  ngOnInit() {
    let params = getQueryParams(document.location.search);
    if(params['token']) {
      setCookie('token',params['token'],100);
      let token = params['token'];
      this.keeper.setToken(token);
    }else {
      let token = getCookie('token');
      this.keeper.setToken(token);
    }

    //this.router.navigate(['Dashboard']);
    this.loggedIn = this.keeper.isLoggedIn();
  }

  logout() {
    this.keeper.setToken('');
    setCookie('token','',100);
    this.loggedIn = false;
  }
}



function getQueryParams(qs:string) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens:any,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/