import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { DirectorComponent } from './director.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { StudentsComponent } from './pages/students/students.component';
import { AcademicsComponent } from './pages/academics/academics.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BodyComponent } from './shared/body/body.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RutFormatDirective } from '../directives/rut-format.directive';
import { FiltertablePipe } from '../pipes/filtertable.pipe';
import { FormsModule } from '@angular/forms';
import { NewstudentComponent } from './modals/newstudent/newstudent.component';
import { ViewstudentComponent } from './modals/viewstudent/viewstudent.component'; // Importa FormsModule


@NgModule({
  declarations: [
    DirectorComponent,
    CoursesComponent,
    ResumeComponent,
    StudentsComponent,
    AcademicsComponent,
    SidebarComponent,
    BodyComponent,
    RutFormatDirective,
    FiltertablePipe,
    NewstudentComponent,
    ViewstudentComponent
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule,
    FormsModule
  ]
})
export class DirectorModule { }
