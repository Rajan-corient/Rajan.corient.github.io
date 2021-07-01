import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
// import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
 
  constructor(
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getLaunchPadData();
    this.getLaunchesData();
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

  getLaunchPadData () {
    this.dataService.getLaunchPadData().subscribe(res => {
      console.log('launchpad data', res)
    })
  }  

  getLaunchesData () {
    this.dataService.getLaunchesData().subscribe(res => {
      console.log('launches data', res)
    })
  }


}
