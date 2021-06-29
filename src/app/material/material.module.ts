import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

const materialComponents:any = [
  MatButtonModule,
  MatSliderModule
]

@NgModule({
  declarations: [],
  imports: [...materialComponents],
  exports: [...materialComponents]
})
export class MaterialModule { }
