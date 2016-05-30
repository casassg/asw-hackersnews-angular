import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
import { UserService } from '../user/user.service';
@Component({
    selector: 'threads',
    templateUrl: 'contribution/threads.component.html',
    styleUrls: ['contribution/threads.component.css'],
    directives: [ROUTER_DIRECTIVES],
})
export class ThreadsComponent implements OnInit {
    threads:  Contribution[];
    error: any;

    constructor(private router: Router,
        private _contributionService: ContributionService, private _userService: UserService) {
    }

    ngOnInit() {
    this._userService.getMe().then(me => {
        this._contributionService.getThreads(me).then(threads => {
            let ret = [];
            for (let thread of threads) {
                this._userService.getUser(thread.user_id).then(user => {
                    thread.user = user;
                    ret.push(thread);
                    //this.threads = ret.sort((c1, c2) => (new Date(c2.created_at)).getTime() - (new Date(c1.created_at)).getTime());
                    
                    this._contributionService.getPost(thread.parent_id).then(contribution => {
			    if(thread.contr_subtype == 'reply'){
			      this._contributionService.getPost(contribution.parent_id).then(contribution2 => {
				  this.threads.push(contribution2);
			      });
			    }
			    else {
				  this.threads.push(contribution);
			    }
			    this.threads = ret.sort((c1, c2) => (new Date(c2.created_at)).getTime() - (new Date(c1.created_at)).getTime());
                    });

                });
                
            }
        });
    });
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
