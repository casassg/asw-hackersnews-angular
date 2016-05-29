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
var user_1 = require('./user');
var user_service_1 = require('./user.service');
var UserDetailComponent = (function () {
    function UserDetailComponent(_userService, _routeParams) {
        this._userService = _userService;
        this._routeParams = _routeParams;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
        this.token = '';
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParams.get('id') !== null) {
            var id = +this._routeParams.get('id');
            this.navigated = true;
            this._userService.getUser(id)
                .then(function (user) { return _this.user = user; });
        }
        else {
            this.navigated = false;
            this.user = new user_1.User();
            this.token = this._routeParams.get('token');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], UserDetailComponent.prototype, "user", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserDetailComponent.prototype, "close", void 0);
    UserDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-user-detail',
            templateUrl: 'app/user/user-detail.component.html',
            styleUrls: ['app/user/user-detail.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_deprecated_1.RouteParams])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=user-detail.component.js.map