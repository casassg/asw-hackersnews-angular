import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { TokenKeeper } from './token.keeper';

@Injectable()
export class UserService {

  private userUrl = 'https://hackersnews.herokuapp.com/api/users/';  // URL to web api
  private meUrl = 'https://hackersnews.herokuapp.com/api/me/';  // URL to web api

  constructor(private http: Http, private keeper: TokenKeeper) { }

  getUser(id: number): Promise<User> {
    return this.http.get(this.userUrl+id)
               .toPromise()
               .then(response => {
               	return response.json()
               })
               .catch(this.handleError);
  }

  getMe(): Promise<User> {
    let headers = new Headers();
    let token = this.keeper.getToken();
    if(!token){
      this.handleError("NOT LOGGED IN! YOU NEED TO LOGIN BEFORE THIS!")
    }
    headers.append('Authorization',token );
    return this.http.get(this.meUrl, {headers:headers})
               .toPromise()
               .then(response => {
                return response.json()
               })
               .catch(this.handleError);
  }


  update(user : User): Promise<User> {
	let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = this.userUrl+user.id

    return this.http
               .put(url, JSON.stringify({'name':user.name}), {headers: headers})
               .toPromise()
               .then(() => user)
               .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
