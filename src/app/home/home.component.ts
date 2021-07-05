import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import * as Highcharts from 'highcharts';
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

  // AGM variables
  title = 'All Launchpads';
  lat:number = 51.678418;
  lng:number = 7.809007;
  zoom: number = 1;

  launchpadList:any[] = [];
  launchesList:any[] = [];

  markers: marker[] = [];

  // Highchar variables
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions:any;

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
      this.launchesList = res.data;
      this.setChartOption();
    })
  }

  setChartOption () {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Column chart'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      xAxis: {
        title: {
          text: 'test'
        },
        categories: ['2010', '2011', '2012', '2013', '2014', '2015']
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3, 4, 5, 6]
        },
        {
          name: 'Line 2',
          data: [6, 5, 4, 3, 2, 1]
        },
        {
          name: 'Line 3',
          data: [1, 2, 3, 4, 5, 6]
        }
      ]
    };  
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
