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
var router_deprecated_2 = require('@angular/router-deprecated');
var contribution_1 = require('./contribution');
var contribution_service_1 = require('./contribution.service');
var user_service_1 = require('../user/user.service');
var ContributionDetailComponent = (function () {
    function ContributionDetailComponent(_contributionService, _routeParams, _userService, router) {
        this._contributionService = _contributionService;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this.router = router;
        this.close = new core_1.EventEmitter();
        this.comment = new contribution_1.Contribution();
        this.navigated = false; // true if navigated here
    }
    ContributionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._routeParams.get('id') !== null) {
            this.comments = [];
            var id = +this._routeParams.get('id');
            this.navigated = true;
            this._contributionService.getPost(id)
                .then(function (contribution) {
                _this._userService.getUser(contribution.user_id).then(function (user1) {
                    contribution.user = user1;
                    contribution.user_name = user1.name;
                    contribution.user_id = user1.id;
                    //contribution.comments.sort((c1, c2) => (new Date(c1.created_at)).getTime() - (new Date(c2.created_at)).getTime());
                    var _loop_1 = function(com) {
                        _this._userService.getUser(com.user_id).then(function (user2) {
                            com.user = user2;
                            com.user_name = user2.name;
                            _this._contributionService.getComment(com.id).then(function (comment) {
                                comment.user_name = user2.name;
                                var _loop_2 = function(rep) {
                                    _this._userService.getUser(rep.user_id).then(function (user) {
                                        rep.user_name = user.name;
                                    });
                                };
                                for (var _i = 0, _a = comment.comments; _i < _a.length; _i++) {
                                    var rep = _a[_i];
                                    _loop_2(rep);
                                }
                                _this.comments.push(comment);
                                _this.comments = _this.comments.sort(function (c1, c2) { return (new Date(c1.created_at)).getTime() - (new Date(c2.created_at)).getTime(); });
                            });
                        });
                    };
                    for (var _i = 0, _a = contribution.comments; _i < _a.length; _i++) {
                        var com = _a[_i];
                        _loop_1(com);
                    }
                });
                _this.contribution = contribution;
            });
        }
        else {
            this.navigated = false;
        }
    };
    ContributionDetailComponent.prototype.postComment = function (text, parent) {
        var _this = this;
        this._contributionService.postComment(text, parent).then(function (comment) {
            _this._userService.getMe().then(function (me) {
                comment.user = me;
                comment.user_name = me.name;
                comment.user_id = me.id;
                _this.comments.push(comment);
                _this.comment = new contribution_1.Contribution();
            });
        });
    };
    ContributionDetailComponent.prototype.loggedIn = function () {
        return this._contributionService.loggedIn();
    };
    ContributionDetailComponent.prototype.vote = function (contribution) {
        this._contributionService.postVote(contribution.id).then(function (vote) {
            contribution.upvote += 1;
            contribution.canVote = false;
        }).catch(function (error) {
            contribution.canVote = false;
            alert('You can\'t vote here');
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', contribution_1.Contribution)
    ], ContributionDetailComponent.prototype, "contribution", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContributionDetailComponent.prototype, "close", void 0);
    ContributionDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-contribution-detail',
            templateUrl: 'contribution/contribution-detail.component.html',
            styleUrls: ['contribution/contribution-detail.component.css'],
            directives: [router_deprecated_2.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [contribution_service_1.ContributionService, router_deprecated_1.RouteParams, user_service_1.UserService, router_deprecated_2.Router])
    ], ContributionDetailComponent);
    return ContributionDetailComponent;
}());
exports.ContributionDetailComponent = ContributionDetailComponent;
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
//# sourceMappingURL=contribution-detail.component.js.map