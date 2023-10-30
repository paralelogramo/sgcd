import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalNote } from '../director/models/personalNote.model';

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

  getStudentHistory(id: string){
    return this.http.get(this.API_URL + '/student/history/' + id);
  }

  getStudentInfoByID(id: string) {
    return this.http.get(this.API_URL + '/student/' + id);
  }

  getPersonalNotesOfStudent(id: string) {
    return this.http.get(this.API_URL + '/student/notes/' + id);
  }

  // Academics
  getAcademics() { }
  getAcademicInfoByID() { }

  // Modules
  getModules() { }
  getModuleInfoByID() { }


  // ============================
  //         POST METHODS
  // ============================

  postPersonalNotesOfStudent(notes: PersonalNote[]) {
    const data = { data: notes }
    return this.http.post(this.API_URL + '/student/notes/', data);
  }
}
