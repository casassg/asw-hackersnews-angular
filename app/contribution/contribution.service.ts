import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contribution } from './contribution';
import { TokenKeeper } from '../user/token.keeper';

@Injectable()
export class ContributionService {

    private contributionsUrl = 'https://hackersnews.herokuapp.com/api/posts/';  // URL to web api
    private askUrl = 'https://hackersnews.herokuapp.com/api/posts/ask/';
    private urlUrl = 'https://hackersnews.herokuapp.com/api/posts/url/';
    private commentUrl = 'https://hackersnews.herokuapp.com/api/comments/';
    private replyUrl = 'https://hackersnews.herokuapp.com/api/replies/';
    private newVote = 'https://hackersnews.herokuapp.com/api/votes/';


    constructor(private http:Http, private keeper:TokenKeeper) {
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

    postComment(text:string, parent:number):Promise<Contribution> {
        const comment = text;
        const parent_id = parent;
        let parameters = {comment, parent_id};

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = this.keeper.getToken();
        headers.append('Authorization', token);

        return this.http
            .post(this.commentUrl, JSON.stringify({'comment':comment, 'parent_id':parent_id}), {headers: headers})
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

        return this.http
            .post(this.replyUrl, JSON.stringify(parameters), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    postVote(id:number){
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