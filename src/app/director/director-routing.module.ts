import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicsComponent } from './pages/academics/academics.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { DirectorComponent } from './director.component';
import { ViewstudentComponent } from './modals/viewstudent/viewstudent.component';

const routes: Routes = [
  {
    path: '',
    component: DirectorComponent,
    children: [
      { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
      { path: 'resumen', component: ResumeComponent },
      { path: 'academicos', component: AcademicsComponent },
      { path: 'estudiantes', component: StudentsComponent },
      { path: 'estudiantes/:dni', component: ViewstudentComponent},
      { path: 'ramos', component: CoursesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }
