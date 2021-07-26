import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataServiceService } from '../service/data-service.service';

interface Imarker {
	lat: number;
	lng: number;
	label?: any;
	draggable: boolean;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // AGM variables
  title = 'Map location by postal code';
  lat:number = 51.678418;
  lng:number = 7.809007;
  zoom: number = 1;

  postalCodeList:any[] = [];
  copyOfPostalCodeList:any[] = [];
  markers: Imarker[] = [];

  searchTerm:FormControl;

  constructor(
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getMockerData();
    this.searchTerm = new FormControl('');

    this.searchTerm.valueChanges.subscribe(data => {
      console.log(data)
      this.postalCodeList = this.copyOfPostalCodeList.filter(item => item.pincode.indexOf(data) != -1);

      if (data == '') {
        this.postalCodeList = this.copyOfPostalCodeList;
      }
    })
  }

  getMockerData () {
    this.dataService.getPostalData().subscribe(res => {
      console.log('citiesData', res)
      this.postalCodeList = res;
      this.copyOfPostalCodeList = res;
      for (const item of this.postalCodeList) {
        const obj = {
          lat: item.lat,
          lng: item.lng,
          label: item.city,
          draggable: true
        }
        // this.markers.push(obj);
      }
    })
  }  

  // getMockerData () {
  //   this.dataService.getMockerData().subscribe(res => {
  //     console.log('citiesData', res)
  //     this.citiesData = res;
  //   })
  // }

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
