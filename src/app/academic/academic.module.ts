import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { AcademicComponent } from './academic.component';


@NgModule({
  declarations: [
    AcademicComponent
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule
  ]
})
export class AcademicModule { }
