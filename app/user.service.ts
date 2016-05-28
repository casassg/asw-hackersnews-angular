import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

  private userUrl = 'http://hackersnews.herokuapp.com/api/users/';  // URL to web api

  constructor(private http: Http) { }

  getUser(id: number): Promise<User> {
    return this.http.get(this.userUrl+id)
               .toPromise()
               .then(response => {
               	let data = response.json().data
               	console.log(response.json());
               	console.log(data);
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
