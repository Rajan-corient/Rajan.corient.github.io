import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient) { }


    getLaunchPadData(): Observable<any> {
      return this.http.get<any>('https://api.spacexdata.com/v3/launchpads')
    }

    getLaunchesData(): Observable<any> {
      return this.http.get<any>('https://api.spacexdata.com/v3/launches')
    }
    

}
