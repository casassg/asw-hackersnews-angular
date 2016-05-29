import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
import { UserService } from '../user/user.service'
@Component({
  selector: 'my-contribution-detail',
  templateUrl: 'contribution/contribution-detail.component.html',
  styleUrls: ['contribution/contribution-detail.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() contribution: Contribution;
  @Output() close = new EventEmitter();
  error: any;
  comment = new Contribution();
  navigated = false; // true if navigated here
  name: String;

  constructor(
    private _contributionService: ContributionService,
    private _routeParams: RouteParams,
    private _userService: UserService) {
  }

  ngOnInit() {
    if (this._routeParams.get('id') !== null) {
      let id = +this._routeParams.get('id');
      this.navigated = true;
      this._contributionService.getPost(id)
          .then(contribution => {
                                this._userService.getUser(id).then(user => this.name = user.name)
                                });
    } else {
      this.navigated = false;
    }
  }

  postReply(text:string, parent:number) {
    this._contributionService.postReply(text, parent);
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