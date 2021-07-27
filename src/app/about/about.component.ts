import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { DataServiceService } from '../service/data-service.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

declare var google: any;

interface Imarker {
	lat: number;
	lng: number;
	label?: any;
	draggable: boolean;
}

interface ILocation {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Imarker;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  geocoder:any;
  public location:any = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
  circleRadius:number = 5000;

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
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private dataService: DataServiceService) { 
      this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;
      this.mapsApiLoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
      });
    }

  ngOnInit(): void {
    this.location.marker.draggable = true;
    this.getMockerData();
    // this.getLocation();
    this.searchTerm = new FormControl('');

    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(data => {
        console.log(data)
        this.postalCodeList = this.copyOfPostalCodeList.filter(item => item.pincode.indexOf(data) != -1);
        this.updateOnMap(data);
  
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

  getLocation () {
    this.dataService.getLocation().subscribe(res => {
      console.log('testData', res)
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
  
  markerDragEnd($event: any, m?: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
   }

   findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    },(results: any, status: any) => {
      this.decomposeAddressComponents(results);
    })
  }

  decomposeAddressComponents(addressArray:any) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for(let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
    return true;
  }

  updateOnMap(address: any) {
    this.findLocation(address);
  }


  // Not getting location data shows below  error to enable billing
  // js?v=quarterly&callback=agmLazyMapsAPILoader&key=AIzaSyDjd85ThShiW3uZ8yKTJ-ipoJ_V97pxx8c:82 Geocoding Service: You must enable Billing on the Google Cloud Project at https://console.cloud.google.com/project/_/billing/enable Learn more at https://developers.google.com/maps/gmp-get-started
  findLocation(address: any) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results: any, status: any) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        // resultsMap.setCenter(results[0].geometry.location);
        // new google.maps.Marker({
        //   map: resultsMap,
        //   position: results[0].geometry.location,
        // });
      } else {
        console.log("Sorry, this search produced no results.");
      }
    })
  }

  circleRadiusInKm() {
    return this.circleRadius / 1000;
  }

  milesToRadius(value: any) {
     this.circleRadius = value / 0.00062137;
  }

  circleRadiusInMiles() {
    return this.circleRadius * 0.00062137;
  }
  

}



