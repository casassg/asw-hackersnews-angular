import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
import { UserService } from '../user/user.service'
@Component({
  selector: 'my-contribution-detail',
  templateUrl: 'contribution/contribution-detail.component.html',
  styleUrls: ['contribution/contribution-detail.component.css']
})
export class ContributionDetailComponent implements OnInit {
  @Input() contribution: Contribution;
  @Output() close = new EventEmitter();
  error: any;
  comment = new Contribution();
  navigated = false; // true if navigated here
  name: String;
  comments: Contribution[];

  constructor(
    private _contributionService: ContributionService,
    private _routeParams: RouteParams,
    private _userService: UserService) {
  }

  ngOnInit() {
    if (this._routeParams.get('id') !== null) {
      this.comments = [];
      let id = +this._routeParams.get('id');
      this.navigated = true;
      this._contributionService.getPost(id)
          .then(contribution => {
                                this._userService.getUser(id).then(user => this.name = user.name);
                                contribution.comments.sort((c1,c2) => c1.created_at - c2.created_at);
                                for (var com of contribution.comments) {
                                  this._userService.getUser(com.user_id).then(user => com.user_id = user.name);
                                  this._contributionService.getComment(com.id).then(comment => {comment.user_id = com.user_id;
                                                                                                for (var rep of comment.comments) {
                                                                                                  this._userService.getUser(rep.user_id).then(user => rep.user_id = user.name);
                                                                                                }
                                                                                                this.comments.push(comment);
                                                                                                });
                                }
                                this.contribution = contribution; 
                                });
    } else {
      this.navigated = false;
    }
  }

  postComment(text:string, parent:number) {
    this._contributionService.postComment(text, parent);

  }

  loggedIn() {
    return this._contributionService.loggedIn();
  }

}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/