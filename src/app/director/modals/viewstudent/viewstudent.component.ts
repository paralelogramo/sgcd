import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../models/student.model';
import { DirectorService } from 'src/app/services/director.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalNote } from '../../models/personalNote.model';
import { Request } from '../../models/request.model';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css']
})
export class ViewstudentComponent {

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  options: string[] = ["Enviada", "En Proceso", "Rechazada", "Aprobada"];

  @Input() vs: Student;

  dataLoaded: boolean = true;

  backButton: boolean = true;
  nextButton: boolean = false;

  newNotes: PersonalNote[] = [];
  requests: Request[] = [];
  saveNotesButton: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public config: NgbCarouselConfig,
    private directorService: DirectorService
  ) {
    config.interval = 0;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    let dni = this.route.snapshot.paramMap.get('dni');
    this.directorService.getStudentInfoByID(dni).subscribe((student: Student) => {
      if (student.exam_date == null){ student.exam_date = "Sin Información" }
      if (student.project_date == null) { student.project_date = "Sin Información" }
      if (student.defense_date == null) { student.defense_date = "Sin Información" }
      this.vs = student;
    },
    (error) => {},
    () => {
      this.directorService.getStudentHistory(dni).subscribe((history: Module[]) => {
        history.forEach((m: Module) => {
          switch (m.state) {
            case "Aprobado":
              m.style = "course-aproved";
              break;
            case "Desaprobado":
              m.style = "course-critical";
              break;
            case "No Tomado":
              m.style = "course-deactivated";
              break;
            case "Eliminado":

              break;
            case "Cursando":
              m.style = "course-activated";
              break;
          }
        })
        this.vs.courses = history;
      });
      this.directorService.getPersonalNotesOfStudent(dni).subscribe((notes: any[]) => {
        this.vs.notes = notes;
      });
      this.directorService.getRequestsOfStudent(dni, this.directorService.dni).subscribe((requests: Request[]) => {
        this.requests = requests;
      });
    });
  }

  nextSlide(carousel) {
    if (carousel.activeId === "firststep") {
      carousel.select("secondstep");
      this.backButton = false;
      this.nextButton = true;
    }
  }

  backSlide(carousel) {
    if (carousel.activeId === "secondstep") {
      carousel.select("firststep");
      this.backButton = true;
      this.nextButton = false;
    }
  }

  newNote(): void {
    this.newNotes.push({ text: "", created_note_timestamp: "", student_ref: this.vs.dni});
    if(this.saveNotesButton) {
      this.saveNotesButton = false;
    }
  }

  removeNewNote(index: number): void {
    this.newNotes.splice(index, 1);
    if(this.newNotes.length === 0) {
      this.saveNotesButton = true;
    }
  }

  autoExpand(event: any): void {
    const element = event.target;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  saveNewNotes(): void {
    this.newNotes.map((note: PersonalNote) => { note.created_note_timestamp = new Date().toISOString() });
    this.directorService.postPersonalNotesOfStudent(this.newNotes).subscribe((response: any) => {
      if (response.status == '200'){
        this.directorService.getPersonalNotesOfStudent(this.vs.dni).subscribe((notes: any[]) => {
          this.vs.notes = notes;
          this.newNotes = [];
          this.saveNotesButton = true;
        });
      }
    });
  }

  deleteNote(id: number) {
    this.directorService.deletePersonalNotesOfStudent(id.toString()).subscribe((response: any) => {
      if(response.status == '200') {
        this.directorService.getPersonalNotesOfStudent(this.vs.dni).subscribe((notes: any[]) => {
          this.vs.notes = notes;
        });
      }
    });
  }

  editProfile() {
    console.log("edit perfil")
  }

  back() {
    this.router.navigateByUrl('/director/estudiantes');
  }

  changeToNotes() {
    
  }

}
