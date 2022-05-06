import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  adduser(params:any) {
    return this.http.post('http://localhost:3333/publish', params)
  }

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any[]>('http://localhost:3333/topic?id=user-created')
  }

  resetPassword(params:any){
    return this.http.post('http://localhost:3333/publish', {
      topic: 'publish',
      targetTopic: 'user-reset-password',
      payload:params}
      )
  }

}
