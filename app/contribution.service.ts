import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contribution } from './contribution';

@Injectable()
export class HeroService {

  private contributionsUrl = 'http://hackersnews.herokuapp.com/api/posts/';  // URL to web api
  private askUrl = 'http://hackersnews.herokuapp.com/api/posts/ask/';
  private urlUrl = 'http://hackersnews.herokuapp.com/api/posts/url/';
  private commentUrl = 'http://hackersnews.herokuapp.com/api/comments/'

  constructor(private http: Http) { }

  getAsks(): Promise<Contribution[]> {
    return this.http.get(this.askUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getUrls(): Promise<Contribution[]> {
    return this.http.get(this.urlUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getPost(id: number) {
    let url = `${this.contributionsUrl}/${id}`;
    return this.http.get(url)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
  }

  postPost(contribution: Contribution): Promise<Contribution> {
    let parameters = {};
    parameters.title = contribution.title;
    if(contribution.contr_subtype=='url'){
        parameters.url= contribution.url;
    }
    else{
      parameters.text = contribution.text;
    }
    
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  getComment(id: number) {
    let url = `${this.commentUrl}/${id}`;
    return this.http.get(url)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
  }

  postComment(contribution: Contribution): Promise<Contribution> {
    let parameters = {};
    parameters.comment = contribution.content;
    parameters.parent_id = contribution.parent_id;
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }










  ///////////////////////



  getHero(id: number) {
    return this.getHeroes()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }

  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/