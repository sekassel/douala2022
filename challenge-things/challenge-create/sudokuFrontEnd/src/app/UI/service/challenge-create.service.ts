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

  createChallenges(challengeCreateModel: ChallengeCreateModel): Observable<ChallengeCreateModel>{
    let host = environment.host;
    return this.http.post<ChallengeCreateModel>(host + "challenge-create", challengeCreateModel);
  }

  deleteChallenges(challengeCreateModel: ChallengeCreateModel): Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(host + "challenge-create/" + challengeCreateModel.id);
  }

  getChallenge(id: number | null): Observable<ChallengeCreateModel> {
    let host = environment.host;
    return this.http.get<ChallengeCreateModel>(host + "challenge-create/" + id);
  }

  updateChallenge(challengeCreateModel: ChallengeCreateModel): Observable<ChallengeCreateModel> {
    let host = environment.host;
    return this.http.put<ChallengeCreateModel>(host + "challenge-create/" + challengeCreateModel.id, challengeCreateModel);
  }

}
