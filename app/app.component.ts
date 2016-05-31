import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,  Router } from '@angular/router-deprecated';

import { UserDetailComponent } from './user/user-detail.component';
import { MeDetailComponent } from './user/me.component';
import { ContributionService } from './contribution/contribution.service';
import { ContributionDetailComponent } from './contribution/contribution-detail.component';
import { NewestComponent } from './contribution/newest.component';
import { AsksComponent } from './contribution/asks.component';
import { UserService }         from './user/user.service';
import { TokenKeeper }         from './user/token.keeper';
import { ReplyComponent } from './contribution/reply.component';
import { setCookie, getCookie }         from './user/cookies.helper';
import { SubmitComponent } from './contribution/submit.component';
import { ThreadsComponent } from './contribution/threads.component';
import { MDL } from './MaterialDesignLiteUpgradeElement'

@Component({
    selector: 'my-app',

    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES, MDL],
    providers: [
        ROUTER_PROVIDERS,
        ContributionService,
        UserService,
        TokenKeeper,
    ]
})
@RouteConfig([
    {path: '/user/:id', name: 'UserDetail', component: UserDetailComponent},
    {path: '/me', name: 'MeDetail', component: MeDetailComponent},
    {path: '/contribution/:id', name: 'ContributionDetail', component: ContributionDetailComponent},
    {path: '/newest', name: 'Newest', component: NewestComponent, useAsDefault: true},
    {path: '/asks', name: 'Asks', component: AsksComponent},
    {path: '/reply/:id', name: 'Reply', component: ReplyComponent},
    {path: '/submit', name: 'Submit', component: SubmitComponent},
    {path: '/threads', name: 'Threads', component: ThreadsComponent},
])

export class AppComponent implements OnInit {


    constructor(private router:Router, private keeper:TokenKeeper, private userServ:UserService) {
    }

    title = 'Hackers News';
    host = window.location.host;
    login_url = 'http://hackersnews.herokuapp.com/angular?redirect_url=http://' + this.host;
    loggedIn = false;

    ngOnInit() {
        let params = getQueryParams(document.location.search);
        if (params['token']) {
            setCookie('token', params['token'], 100);
            let token = params['token'];
            this.keeper.setToken(token);
        } else {
            let token = getCookie('token');
            this.keeper.setToken(token);
        }

        //this.router.navigate(['Dashboard']);
        this.loggedIn = this.keeper.isLoggedIn();
        if (this.loggedIn) {
            this.userServ.getMe().then(user=> {
                this.keeper.registerUser(user);
            })
        }
    }

    logout() {
        this.keeper.setToken('');
        setCookie('token', '', 100);
        this.loggedIn = false;
    }

    closeNav() {
        let layout : any;
        layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
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