import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'director', loadChildren: () => import('./director/director.module').then(m => m.DirectorModule), canActivate: [AuthGuard] },
  { path: 'academic', loadChildren: () => import('./academic/academic.module').then(m => m.AcademicModule), canActivate: [AuthGuard]},
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
