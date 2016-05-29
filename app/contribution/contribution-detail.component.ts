import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
@Component({
  selector: 'my-contribution-detail',
  templateUrl: 'contribution/contribution-detail.component.html',
  styleUrls: ['contribution/contribution-detail.component.css']
})
export class ContributionDetailComponent implements OnInit {
  @Input() contribution: Contribution;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private _contributionService: ContributionService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this._routeParams.get('id') !== null) {
      let id = +this._routeParams.get('id');
      this.navigated = true;
      this._contributionService.getPost(id)
          .then(contribution => this.contribution = contribution);
    } else {
      this.navigated = false;
    }
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/