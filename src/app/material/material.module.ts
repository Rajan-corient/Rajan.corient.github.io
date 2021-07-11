import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

const materialComponents:any = [
  MatButtonModule,
  MatSliderModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [],
  imports: [...materialComponents],
  exports: [...materialComponents]
})
export class MaterialModule { }
