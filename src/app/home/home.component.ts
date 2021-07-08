import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import * as Highcharts from 'highcharts';

interface Imarker {
	lat: number;
	lng: number;
	label?: any;
	draggable: boolean;
}

interface IchartData {
  series: Iseries[],
  categories: (string | number)[]
}

interface Iseries {
  name: string,  
  data: Idata[],  
}

interface Idata {
  name: string,  
  y: number | string,
  rocket_name?: string,
  rocket_id?: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // AGM variables
  title = 'Launchpad location';
  lat:number = 51.678418;
  lng:number = 7.809007;
  zoom: number = 1;

  launchpadList:any[] = [];
  launchesList:any[] = [];

  upcomingCount:number = 0;
  pastCount:number = 0;
  currentIndex:number = 0;

  markers: Imarker[] = [];

  // Highchar variables
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions:any;
  chartUpdateFlag:boolean = false;

  constructor(
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getLaunchPadData();
    this.getLaunchesData();
    this.setChartOption();
  }

  getLaunchPadData () {
    this.dataService.getLaunchPadData().subscribe(res => {
      console.log('launchpadList', res)
      this.launchpadList = res;
      for (const launchItem of this.launchpadList) {
        const obj = {
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
      console.log('launchesList', res)
      this.launchesList = res;

      this.upcomingCount = this.launchesList.filter(item => item.upcoming).length;
      this.pastCount = this.launchesList.filter(item => !item.upcoming).length;

      const chartData:IchartData = {
        series: [{
          name: 'All Launches',
          data: []
        }],
        categories: []
      }

      chartData.categories = [...new Set(this.launchesList.map(item => item.launch_year))];
      let launchObj:any = {};

      // with forloop inside other forloop
      // for (const item of chartData.categories) {
      //   launchObj[item] = [];
      //   for (const launchData of this.launchesList) {
      //     if (launchData.launch_year === item) {
      //       launchObj[item].push(launchData);
      //     }
      //   }
      //   const obj = {
      //     name: '',
      //     y: launchObj[item].length
      //   }
      //   chartData.series[0].data.push(obj);
      // }


      // with two separate forloops
      for (const launchData of this.launchesList) {
        if (!(launchData.launch_year in launchObj)) {
          launchObj[launchData.launch_year] = [];
        }
        launchObj[launchData.launch_year].push(launchData);
      }

      for (const key in launchObj) {
        const element = launchObj[key];
        const obj = {
          name: '',
          y: element.length
        }
        chartData.series[0].data.push(obj);
      }
      this.chartOptions.series = chartData.series;
      this.chartOptions.xAxis.categories = chartData.categories;
      this.chartUpdateFlag = true;
    })
  }

  setChartOption () {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Launche over time'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Year'
        },
        categories: []
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      series: [
        {
          name: 'Line 1',
          data: []
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
  
  markerDragEnd(m: Imarker, $event: any) {
    console.log('dragEnd', m, $event);
  }


}
