import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  adduser(params:any) {
    return this.http.post('https://event-broker-douala2022.herokuapp.com/publish', params)
  }

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any[]>('https://event-broker-douala2022.herokuapp.com/topic?id=user-created')
  }

  resetPassword(params:any,marams:any){
     const resp=this.http.post('https://event-broker-douala2022.herokuapp.com/remove',marams
      ).subscribe(
        response=>{
          console.log(response)
        },
        err=>console.log(err)
      )

      return this.adduser({
        topic: 'publish',
        targetTopic: 'user-created',
        time: new Date().toISOString(),
        payload: {
            userName: params.payload.userName,
            token: params.payload.token,
            password:params.payload.password,
            email:params.payload.email
        }
      })
  }

}
