import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contribution } from './contribution/contribution';

@Injectable()
export class ContributionService {

  private contributionsUrl = 'http://hackersnews.herokuapp.com/api/posts/';  // URL to web api
  private askUrl = 'http://hackersnews.herokuapp.com/api/posts/ask/';
  private urlUrl = 'http://hackersnews.herokuapp.com/api/posts/url/';
  private commentUrl = 'http://hackersnews.herokuapp.com/api/comments/';
  private replyUrl = 'http://hackersnews.herokuapp.com/api/replies/';

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

  getPost(id: number): Promise<Contribution> {
    console.log(this.contributionsUrl+id);
    return this.http.get(this.contributionsUrl+id)
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
      parameters.content = contribution.content;
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

  getReply(id: number) {
    let url = `${this.replyUrl}/${id}`;
    return this.http.get(url)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
  }

  postReply(contribution: Contribution): Promise<Contribution> {
    let parameters = {};
    parameters.reply = contribution.content;
    parameters.parent_id = contribution.parent_id;
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.replyUrl, JSON.stringify(parameters), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }





  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}