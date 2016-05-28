import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { User }        from './user';
import { UserService } from './user.service';
@Component({
  selector: 'my-user-detail',
  templateUrl: 'app/user-detail.component.html',
  styleUrls: ['app/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  token = '';

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {

    if (this._routeParams.get('id') !== null) {
      let id = +this._routeParams.get('id');
      this.navigated = true;
      this._userService.getUser(id)
          .then(user => this.user = user);
    } else {
      this.navigated = false;
      this.user = new User();
      this.token = this._routeParams.get('token');
    }
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/