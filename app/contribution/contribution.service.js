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
var token_keeper_1 = require('../user/token.keeper');
var ContributionService = (function () {
    function ContributionService(http, keeper) {
        this.http = http;
        this.keeper = keeper;
        this.contributionsUrl = 'https://hackersnews.herokuapp.com/api/posts/'; // URL to web api
        this.askUrl = 'https://hackersnews.herokuapp.com/api/posts/ask/';
        this.urlUrl = 'https://hackersnews.herokuapp.com/api/posts/url/';
        this.commentUrl = 'https://hackersnews.herokuapp.com/api/comments/';
        this.replyUrl = 'https://hackersnews.herokuapp.com/api/replies/';
        this.newVote = 'https://hackersnews.herokuapp.com/api/votes/';
    }
    ContributionService.prototype.toPost = function (json) {
        var contribution = json.contribution;
        contribution.comments = json.comments;
        return contribution;
    };
    ContributionService.prototype.toComment = function (json) {
        var contribution = json.contribution;
        contribution.comments = json.replies;
        return contribution;
    };
    ContributionService.prototype.getAsks = function () {
        return this.http.get(this.askUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    ContributionService.prototype.getUrls = function () {
        return this.http.get(this.urlUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ContributionService.prototype.getPost = function (id) {
        var _this = this;
        return this.http.get(this.contributionsUrl + id)
            .toPromise()
            .then(function (response) { return _this.toPost(response.json()); })
            .catch(this.handleError);
    };
    ContributionService.prototype.postPost = function (contribution) {
        var title = contribution.title;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!");
        }
        headers.append('Authorization', token);
        if (contribution.contr_subtype == 'url') {
            var parameters = { 'title': contribution.title, 'url': contribution.url };
            return this.http
                .post(this.contributionsUrl, JSON.stringify(parameters), { headers: headers })
                .toPromise()
                .then(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            var content = contribution.content;
            var parameters = { 'title': contribution.title, 'content': contribution.content };
            return this.http
                .post(this.contributionsUrl, JSON.stringify(parameters), { headers: headers })
                .toPromise()
                .then(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    ContributionService.prototype.getComment = function (id) {
        var _this = this;
        var url = this.commentUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return _this.toComment(response.json()); })
            .catch(this.handleError);
    };
    ContributionService.prototype.postComment = function (text, parent) {
        var parameters = { 'comment': text, 'parent_id': parent };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!");
        }
        headers.append('Authorization', token);
        return this.http
            .post(this.commentUrl, JSON.stringify(parameters), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ContributionService.prototype.getReply = function (id) {
        var url = this.replyUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ContributionService.prototype.postReply = function (contribution) {
        var reply = contribution.content;
        var parent_id = contribution.parent_id;
        var parameters = { 'parent_id': contribution.parent_id, 'reply': contribution.content };
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!");
        }
        headers.append('Authorization', token);
        return this.http
            .post(this.replyUrl, JSON.stringify(parameters), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ContributionService.prototype.postVote = function (id) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        var token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!");
        }
        headers.append('Authorization', token);
        var parameters = { 'contribution_id': id };
        return this.http
            .post(this.newVote, JSON.stringify(parameters), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ContributionService.prototype.loggedIn = function () {
        return this.keeper.isLoggedIn();
    };
    ContributionService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ContributionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, token_keeper_1.TokenKeeper])
    ], ContributionService);
    return ContributionService;
}());
exports.ContributionService = ContributionService;
//# sourceMappingURL=contribution.service.js.map