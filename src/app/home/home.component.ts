import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { MapsAPILoader } from '@agm/core';

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: any;
	draggable: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title = 'All Launchpads';
  lat:number = 51.678418;
  lng:number = 7.809007;
  zoom: number = 1;

  launchpadList:any[] = [];
  launchesList:any[] = [];

  markers: marker[] = [];


  constructor(
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getLaunchPadData();
    this.getLaunchesData();
  }

  getLaunchPadData () {
    this.dataService.getLaunchPadData().subscribe(res => {
      console.log('launchpad data', res)
      this.launchpadList = res;
      for (const launchItem of this.launchpadList) {
        const obj =  {
          lat: launchItem.location.latitude,
          lng: launchItem.location.longitude,
          label: launchItem.location.name,
          draggable: true
        }
        this.markers.push(obj);
      }
    })
  }  

  getLaunchesData () {
    this.dataService.getLaunchesData().subscribe(res => {
      console.log('launches data', res)
    })
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: any) {
    console.log('dragEnd', m, $event);
  }


}
