import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contribution } from './contribution';
import { TokenKeeper } from '../user/token.keeper';
import { User } from '../user/user';
@Injectable()
export class ContributionService {

    private contributionsUrl = 'https://hackersnews.herokuapp.com/api/posts/';  // URL to web api
    private askUrl = 'https://hackersnews.herokuapp.com/api/posts/ask/';
    private urlUrl = 'https://hackersnews.herokuapp.com/api/posts/url/';
    private commentUrl = 'https://hackersnews.herokuapp.com/api/comments/';
    private replyUrl = 'https://hackersnews.herokuapp.com/api/replies/';
    private newVote = 'https://hackersnews.herokuapp.com/api/votes/';
    private threadsUrl = 'https://hackersnews.herokuapp.com/api/users/';


    constructor(private http:Http, private keeper:TokenKeeper) {
    }

    private toPost(json:any):Contribution{
        let contribution = json.contribution;
        contribution.comments= json.comments;
        return contribution;
    }
    private toComment(json:any):Contribution{
        let contribution = json.contribution;
        contribution.comments= json.replies;
        return contribution;
    }

    getThreads(me:User):Promise<Contribution[]>{
      console.log(me);
      let id = me.id;
      return this.http.get(this.threadsUrl + id + '/threads')
	  .toPromise()
	  .then(response => {
	    return response.json() 
	  })
	  . catch(this.handleError);
    }

    getAsks():Promise<Contribution[]> {
        return this.http.get(this.askUrl)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    getUrls():Promise<Contribution[]> {
        return this.http.get(this.urlUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPost(id:number):Promise<Contribution> {
        return this.http.get(this.contributionsUrl + id)
            .toPromise()
            .then(response => this.toPost(response.json()))
            .catch(this.handleError);
    }
    
    postPost(contribution:Contribution):Promise<Contribution> {
        const title = contribution.title;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!")
        }
        headers.append('Authorization', token);

        let parameters = {'title':contribution.title, 'url': contribution.url, 'text': contribution.content};
            return this.http
                .post(this.contributionsUrl, JSON.stringify(parameters), {headers: headers})
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError);

    }

    getComment(id:number) {
        let url = `${this.commentUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.toComment(response.json()))
            .catch(this.handleError);
    }

    postComment(text:string, parent:number):Promise<Contribution> {
        let parameters = {'comment':text, 'parent_id':parent};

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!")
        }
        headers.append('Authorization', token);

        return this.http
            .post(this.commentUrl, JSON.stringify(parameters), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getReply(id:number) {
        let url = `${this.replyUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    postReply(text:string, parentid:number):Promise<Contribution> {
        const reply = text;
        const parent_id = parentid;
        let parameters = {'parent_id':parent_id, 'reply':reply};
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let token = this.keeper.getToken();
        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!")
        }
        headers.append('Authorization', token);
        return this.http
            .post(this.replyUrl, JSON.stringify(parameters), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    postVote(id:number){
      let headers = new Headers({
          'Content-Type': 'application/json'});
        let token = this.keeper.getToken();

        if (!token) {
            this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!")
        }
        headers.append('Authorization', token);
        let parameters = {'contribution_id':id};
      return this.http
                   .post(this.newVote, JSON.stringify(parameters), {headers: headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }

    loggedIn() {
      return this.keeper.isLoggedIn();
    }

    private handleError(error:any)  {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}