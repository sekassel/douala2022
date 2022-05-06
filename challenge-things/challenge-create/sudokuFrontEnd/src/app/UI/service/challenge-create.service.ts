import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ChallengeCreateModel} from "../../models/challenge-create.model";
import {Observable} from "rxjs";

@Injectable({providedIn:"root"})
export class ChallengeCreateService {
  constructor(private http: HttpClient) {

  }

  getAllChallenges(): Observable<ChallengeCreateModel[]>{
    let host = environment.host;
    return this.http.get<ChallengeCreateModel[]>(host + "challenge-create");
  }

  getSelectedChallenges(): Observable<ChallengeCreateModel[]>{
    let host = environment.host;
    return this.http.get<ChallengeCreateModel[]>(host + "challenge-create?selected=true");
  }

  getAvailableChallenges(): Observable<ChallengeCreateModel[]>{
    let host = environment.host;
    return this.http.get<ChallengeCreateModel[]>(host + "challenge-create?avalable=true");
  }

}
