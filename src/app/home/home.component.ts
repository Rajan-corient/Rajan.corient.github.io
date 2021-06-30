import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getLaunchPadData();
    this.getLaunchesData();
  }

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
