import { Injectable }    from '@angular/core';

@Injectable()
export class TokenKeeper {

  private token = '';


  setToken(token: string) {
    this.token = token;
  }

  isLoggedIn():boolean {
    return this.token!=='';
  }

  getToken():string {
    return this.token;
  }
}
