import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  readonly API_URL = environment.BASE_URL;

  constructor(
    private http: HttpClient
  ) { }

  // ============================
  //         GET METHODS
  // ============================

  // Students
  getStudents() {
    return this.http.get(this.API_URL + '/student');
  }

  getStudentInfoByID() { }

  // Academics
  getAcademics() { }
  getAcademicInfoByID() { }

  // Modules
  getModules() { }
  getModuleInfoByID() { }

}
