import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Model
import { User } from '../models/user';

@Injectable()

export class UserService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAll() {
    return this.http.get<User[]>(this.url + 'users');
  }

  getById(id) {
    return this.http.get(this.url + 'users/' + id);
  }

  create(user) {
    return this.http.post(this.url + "users", user);
  }

  update(user, values) {
    return this.http.put<any>(this.url + "users/" + user.id, values);
  }

  delete(id) {
    return this.http.delete(this.url + 'users/' + id);
  }
}
