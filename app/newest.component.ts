import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Contribution }        from './contribution/contribution';
import { ContributionService } from './contribution/contribution.service';
@Component({
  selector: 'my-newest',
  templateUrl: 'app/newest.html',
  styleUrls: ['app/newest.component.css']
})
export class NewestComponent implements OnInit {

  contributions: Contribution[] = [];

  constructor(
    private _contributionService: ContributionService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    var _this = this;
    return this._contributionService.getUrls()
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
