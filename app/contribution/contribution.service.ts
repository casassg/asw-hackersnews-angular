import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contribution } from './contribution';

@Injectable()
export class ContributionService {

<<<<<<< HEAD
  private contributionsUrl = 'http://hackersnews.herokuapp.com/api/posts/';  // URL to web api
  private askUrl = 'http://hackersnews.herokuapp.com/api/posts/ask/';
  private urlUrl = 'http://hackersnews.herokuapp.com/api/posts/url/';
  private commentUrl = 'http://hackersnews.herokuapp.com/api/comments/';
  private replyUrl = 'http://hackersnews.herokuapp.com/api/replies/';
  private newVote = 'http://hackersnews.herokuapp.com/api/votes/';

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
    return this.http.get(this.contributionsUrl+id)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
  }
=======
    private contributionsUrl = 'https://hackersnews.herokuapp.com/api/posts/';  // URL to web api
    private askUrl = 'https://hackersnews.herokuapp.com/api/posts/ask/';
    private urlUrl = 'https://hackersnews.herokuapp.com/api/posts/url/';
    private commentUrl = 'https://hackersnews.herokuapp.com/api/comments/';
    private replyUrl = 'https://hackersnews.herokuapp.com/api/replies/';
>>>>>>> 9740b828ae3e64707b2da0ce262ed1dfd9485171

    constructor(private http:Http) {
    }

    private toContribution(json:any):Contribution{
        let contribution = json.contribution;
        console.log(contribution);
        return contribution;

    }

    getAsks():Promise<Contribution[]> {
        return this.http.get(this.askUrl)
            .toPromise()
            .then(response => {
                return response.json().data
            })
            .catch(this.handleError);
    }

    getUrls():Promise<Contribution[]> {
        return this.http.get(this.urlUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getPost(id:number):Promise<Contribution> {
        return this.http.get(this.contributionsUrl + id)
            .toPromise()
            .then(response => this.toContribution(response.json()))
            .catch(this.handleError);
    }

    postPost(contribution:Contribution):Promise<Contribution> {
        const title = contribution.title;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (contribution.contr_subtype == 'url') {
            const url = contribution.url;
            let parameters = {title, url};
            return this.http
                .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
        }
        else {
            const content = contribution.content;
            let parameters = {title, content};
            return this.http
                .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
        }

    }

    getComment(id:number) {
        let url = `${this.commentUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    postComment(contribution:Contribution):Promise<Contribution> {
        const comment = contribution.content;
        const parent_id = contribution.parent_id;
        let parameters = {comment, parent_id};
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    getReply(id:number) {
        let url = `${this.replyUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    postReply(contribution:Contribution):Promise<Contribution> {
        const reply = contribution.content;
        const parent_id = contribution.parent_id;
        let parameters = {parent_id, reply};
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

<<<<<<< HEAD
  postVote(id:number){
=======
        return this.http
            .post(this.replyUrl, JSON.stringify(parameters), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
>>>>>>> 9740b828ae3e64707b2da0ce262ed1dfd9485171

    let headers = new Headers({
        'Content-Type': 'application/json'});

    return this.http
                 .post(this.newVote, JSON.stringify(id), {headers: headers})
                 .toPromise()
                 .then(res => res.json().data)
                 .catch(this.handleError);
  }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}