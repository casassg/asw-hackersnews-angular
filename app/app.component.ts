import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,  Router } from '@angular/router-deprecated';

import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { UserDetailComponent } from './user-detail.component';
import { HeroService }         from './hero.service';
import { UserService }         from './user.service';

@Component({
  selector: 'my-app',

  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
      <a [routerLink]="['UserDetail',{id:1}]">User</a>
      <a [href]='login_url'>Login</a>
      {{token}}
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    UserService
  ]
})
@RouteConfig([
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent },
  { path: '/heroes',     name: 'Heroes',     component: HeroesComponent },
  { path: '/user/:id',     name: 'UserDetail',     component: UserDetailComponent }
])
export class AppComponent  implements OnInit {
  constructor(private router: Router) {}
  title = 'Tour of Heroes';
  host = window.location.host;
  login_url = 'http://hackersnews.herokuapp.com/angular?redirect_url=http://'+this.host;

  ngOnInit() {
    this.router.navigate(['Dashboard']);
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/