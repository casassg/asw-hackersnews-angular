"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var user_detail_component_1 = require('./user/user-detail.component');
var me_component_1 = require('./user/me.component');
var hero_service_1 = require('./hero.service');
var contribution_service_1 = require('./contribution/contribution.service');
var contribution_detail_component_1 = require('./contribution/contribution-detail.component');
var newest_component_1 = require('./contribution/newest.component');
var asks_component_1 = require('./contribution/asks.component');
var user_service_1 = require('./user/user.service');
var token_keeper_1 = require('./user/token.keeper');
var reply_component_1 = require('./contribution/reply.component');
var cookies_helper_1 = require('./user/cookies.helper');
var submit_component_1 = require('./contribution/submit.component');
var threads_component_1 = require('./contribution/threads.component');
var AppComponent = (function () {
    function AppComponent(router, keeper, userServ) {
        this.router = router;
        this.keeper = keeper;
        this.userServ = userServ;
        this.title = 'Hackers News';
        this.host = window.location.host;
        this.login_url = 'http://hackersnews.herokuapp.com/angular?redirect_url=http://' + this.host;
        this.loggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = getQueryParams(document.location.search);
        if (params['token']) {
            cookies_helper_1.setCookie('token', params['token'], 100);
            var token = params['token'];
            this.keeper.setToken(token);
        }
        else {
            var token = cookies_helper_1.getCookie('token');
            this.keeper.setToken(token);
        }
        //this.router.navigate(['Dashboard']);
        this.loggedIn = this.keeper.isLoggedIn();
        if (this.loggedIn) {
            this.userServ.getMe().then(function (user) {
                _this.keeper.registerUser(user);
            });
        }
    };
    AppComponent.prototype.logout = function () {
        this.keeper.setToken('');
        cookies_helper_1.setCookie('token', '', 100);
        this.loggedIn = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a [routerLink]=\"['Newest']\">Newest</a>\n      <a [routerLink]=\"['Asks']\">Asks</a>\n      <a *ngIf=\"loggedIn\" [routerLink]=\"['Threads']\">Threads</a>\n      <a [routerLink]=\"['Submit']\">Submit</a>\n      <a *ngIf=\"loggedIn\" [routerLink]=\"['MeDetail']\">Me</a>\n      <a *ngIf=\"!loggedIn\" [href]='login_url'>Login</a>\n      <a *ngIf=\"loggedIn\" (click)='logout()'>Logout</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
            styleUrls: ['app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                hero_service_1.HeroService,
                contribution_service_1.ContributionService,
                user_service_1.UserService,
                token_keeper_1.TokenKeeper,
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/user/:id', name: 'UserDetail', component: user_detail_component_1.UserDetailComponent },
            { path: '/me', name: 'MeDetail', component: me_component_1.MeDetailComponent },
            { path: '/contribution/:id', name: 'ContributionDetail', component: contribution_detail_component_1.ContributionDetailComponent },
            { path: '/newest', name: 'Newest', component: newest_component_1.NewestComponent, useAsDefault: true },
            { path: '/asks', name: 'Asks', component: asks_component_1.AsksComponent },
            { path: '/reply/:id', name: 'Reply', component: reply_component_1.ReplyComponent },
            { path: '/submit', name: 'Submit', component: submit_component_1.SubmitComponent },
            { path: '/threads', name: 'Threads', component: threads_component_1.ThreadsComponent },
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, token_keeper_1.TokenKeeper, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
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
//# sourceMappingURL=app.component.js.map