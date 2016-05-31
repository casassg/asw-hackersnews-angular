import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { User }        from './user';
import { UserService } from './user.service';
@Component({
  selector: 'my-user-detail',
  templateUrl: 'user/me.component.html',
  styleUrls: ['user/me.component.css']
})
export class MeDetailComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter();
  error: any;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private router: Router) {
  }

  ngOnInit() {
      this._userService.getMe()
          .then(user => this.user = user)
          .catch(error => this.router.navigate(['Newest']))
  }

  save(updated_user:User){
    this._userService.update(updated_user)
      .then(user => this.user = user)
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/