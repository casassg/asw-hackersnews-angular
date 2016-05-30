import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams} from '@angular/router-deprecated';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Contribution }        from './contribution';
import { ContributionService } from './contribution.service';
import { UserService } from '../user/user.service'
@Component({
  selector: 'my-submit',
  templateUrl: 'contribution/submit.component.html',
  styleUrls: ['contribution/submit.component.css']
})
export class SubmitComponent implements OnInit {
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  contribution = new Contribution();

  constructor(
    private _contributionService: ContributionService,
    private _routeParams: RouteParams,
    private _userService: UserService,
  private _router: Router) {
    this.error = "";
  }

  ngOnInit() {
    this.navigated = true;
  }

  loggedIn() {
    return this._contributionService.loggedIn();
  }

  post() {
    if (this.contribution.title == undefined){
      alert("Necessites un titol per crear un post nou");
      return;
    }
    if (this.contribution.url == undefined && this.contribution.content == undefined){
      alert("Necessites un text o una url per crear un post nou");
      return;
    }
    this._contributionService.postPost(this.contribution).then(
      contribution => this._router.navigate(['ContributionDetail', {'id':contribution.id}])
    ).catch(error => {
          console.log(error);
          if (error.status == 400){
            alert("No es pot crear un post amb url i text a la vegada");
          }
        })
  }

}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/