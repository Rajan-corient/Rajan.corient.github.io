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

    getPostalData(): Observable<any> {
      // mock api to get postal code data
      // https://run.mocky.io/v3/3c48b757-7977-421f-ac01-2d0ab6bcfcd7
      return this.http.get<any>('https://run.mocky.io/v3/3c48b757-7977-421f-ac01-2d0ab6bcfcd7')
    }


    // mock data
    // [
    //   {
    //     "pincode": "400065",
    //     "location": "Aareymilk Colony",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400069",
    //     "location": "Andheri East",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400066",
    //     "location": "Borivali East",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400067",
    //     "location": "Charkop",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400097",
    //     "location": "Malad East",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400064",
    //     "location": "Malad West",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //     {
    //     "pincode": "400101",
    //     "location": "Kandivali East",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //    {
    //     "pincode": "400025",
    //     "location": "Prabhadevi",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //    {
    //     "pincode": "400096",
    //     "location": "Seepz",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   },
    //    {
    //     "pincode": "400063",
    //     "location": "Goregaon East",
    //     "district": "Mumbai",
    //     "state": "Maharashtra"
    //   }
    // ]
    

}
