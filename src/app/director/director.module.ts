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

@NgModule({
  declarations: [
    DirectorComponent,
    CoursesComponent,
    ResumeComponent,
    StudentsComponent,
    AcademicsComponent,
    SidebarComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule
  ]
})
export class DirectorModule { }
