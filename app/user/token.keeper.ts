import { Injectable }    from '@angular/core';
import { User } from './user'

@Injectable()
export class TokenKeeper {

  private token = '';
  private user:User;


  setToken(token: string) {
    this.token = token;
  }

  isLoggedIn():boolean {
    return this.token!=='';
  }

  getToken():string {
    return this.token;
  }

  registerUser(user:User) {
    this.user = user;
  }

  getCurrentUser() {
    return this.user;
  }
}
