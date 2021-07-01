import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjd85ThShiW3uZ8yKTJ-ipoJ_V97pxx8c'
    })
  ]
})
export class HomeModule { }
