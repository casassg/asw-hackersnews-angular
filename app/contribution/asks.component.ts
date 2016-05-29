import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
@Component({
    selector: 'asks',
    templateUrl: 'contribution/asks.component.html',
    styleUrls: ['contribution/asks.component.css'],
    directives: [ROUTER_DIRECTIVES],
})
export class AsksComponent implements OnInit {
    asks:  Contribution[];
    error: any;

    constructor(private router: Router,
        private _contributionService: ContributionService) {
    }

    ngOnInit() {
        this._contributionService.getAsks().then(asks => this.asks = asks);
    }


    loggedIn() {
        return this._contributionService.loggedIn();
    }

    vote(contribution: Contribution) {
        this._contributionService.postVote(contribution.id).then(vote =>{
            contribution.upvote+=1;
            contribution.canVote=false;
        }).catch(error => {
            contribution.canVote=false;
            alert('You can\'t vote here');
        });
    }

}

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */