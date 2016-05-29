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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var token_keeper_1 = require('./token.keeper');
var UserService = (function () {
    function UserService(http, keeper) {
        this.http = http;
        this.keeper = keeper;
        this.userUrl = 'http://hackersnews.herokuapp.com/api/users/'; // URL to web api
        this.meUrl = 'http://hackersnews.herokuapp.com/api/me/'; // URL to web api
    }
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.userUrl + id)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.getMe = function () {
        var headers = new http_1.Headers();
        var token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!");
        }
        headers.append('Authorization', token);
        return this.http.get(this.meUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.userUrl + user.id;
        return this.http
            .put(url, JSON.stringify({ 'name': user.name }), { headers: headers })
            .toPromise()
            .then(function () { return user; })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, token_keeper_1.TokenKeeper])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map