import { Component, ViewChild } from '@angular/core';
import { Student } from '../../models/student.model';
import { NgbModal, NgbModalRef, NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DirectorService } from 'src/app/services/director.service';
import { ViewstudentComponent } from '../../modals/viewstudent/viewstudent.component';

let STUDENT_DATA: Student[] = [];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;
  backButton: boolean = true;
  nextButton: boolean = false;
  createButtonText: string = "Siguiente";

  filterText: string = "";

  @ViewChild('modalverificationdelete') modal_delete_1: NgbModalRef;
  @ViewChild('modalsecondverificationdelete') modal_delete_2: NgbModalRef;

  askedDeleteStudent: string;

  newStudentForm: FormGroup;

  page = 1;
  pageSize = 8;
  collectionSize = STUDENT_DATA.length;
  students: Student[] = [];

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    public config: NgbCarouselConfig,
    private toastr: ToastrService,
    private directorService: DirectorService
  ) {
    this.refreshStudents();
    config.interval = 0;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.newStudentForm = this.fb.group({
      name: ['Vicente Rojas Aranda', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ'\- ]+( [a-zA-ZÀ-ÖØ-öø-ÿ'\- ]+){0,2} [a-zA-ZÀ-ÖØ-öø-ÿ'\- ]+( [a-zA-ZÀ-ÖØ-öø-ÿ'\- ]+){0,1}$/)]],
      uni_id: ['2015407054', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dni: ['19.254.373-8', [Validators.required]],
      email: ['virojas15@alumnos.utalca.cl', [Validators.required, Validators.email]],
      emailextra: [''],
      state: ['Graduado', [Validators.required]],
      scholarship: ['Sin Beca', [Validators.required]],
      advisor: ['Renzo Angles', [Validators.required]],
      coadvisor: [''],
      year: [2023, [Validators.required]],
      courses: [{
        "course1": "no",
        "course2": "no",
        "course3": "no",
        "course4": "no",
        "course5": "no",
        "course6": "no",
        "course7": "no",
        "course8": "no",
        "course9": "no",
        "course10": "no",
        "course11": "no",
        "course12": "no",
        "course13": "no",
        "course14": "no",
        "course15": "no",
        "course16": "no",
        "course17": "no",
        "course18": "no",
        "course19": "no",
      }]
    });

    this.loadStudents();
  }

  loadStudents() {
    this.directorService.getStudents().subscribe((students: Student[]) => {
      STUDENT_DATA = students;
      STUDENT_DATA = this.mergeDuplicateStudents(STUDENT_DATA);
      this.refreshStudents();
    },
      (error) => {},
      () => {
        const btn = document.getElementsByClassName('btn'); // Asegúrate de que el tipo sea HTMLButtonElement
        setTimeout(() => {
          console.log(btn[1]);
          (btn[1] as HTMLButtonElement).click();
        }, 1000);
        
        // if (btn) {
        //   btn.click();
        // }
      });
  }

  mergeDuplicateStudents(studentData: Student[]): Student[] {
    const mergedStudents: { [key: string]: Student } = {};

    studentData.forEach((student) => {
      const key = `${student.uni_id}-${student.name}`;

      if (key in mergedStudents) {
        const existingStudent = mergedStudents[key];

        if (student.advisor) {
          existingStudent.advisor = student.advisor;
        }

        if (student.coadvisor) {
          if (existingStudent.coadvisor) {
            existingStudent.coadvisor += `, ${student.coadvisor}`;
          } else {
            existingStudent.coadvisor = student.coadvisor;
          }
        }
      } else {
        mergedStudents[key] = student;
      }
    });

    Object.values(mergedStudents).forEach((student) => {
      if (student.coadvisor === null) {
        student.coadvisor = "No Definido";
      }
    });

    return Object.values(mergedStudents);
  }

  submitNewStudent(s: any) {
    STUDENT_DATA.push(s);
    this.refreshStudents();
    this.newStudentForm.reset();
  }

  refreshStudents() {
    this.students = STUDENT_DATA.map((country, i) => ({ id: i + 1, ...country })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    this.collectionSize = STUDENT_DATA.length;
  }

  openViewStudentModal(s: Student) {
    const modalRef = this.modalService.open(ViewstudentComponent, {centered: true, size: "lg" });
    s.courses = [];
    modalRef.componentInstance.vs = s;
  }
  
  openNewStudent(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "lg" }).result.then(
      (result) => {
        if (result === 'create') {
          STUDENT_DATA.push(this.newStudentForm.value);
          this.refreshStudents();
          this.backButton = true;
          this.nextButton = false;
          this.createButtonText = "Siguiente";
          this.newStudentForm.reset();
          this.newStudentForm.controls['courses'].setValue({
            "course1": "no",
            "course2": "no",
            "course3": "no",
            "course4": "no",
            "course5": "no",
            "course6": "no",
            "course7": "no",
            "course8": "no",
            "course9": "no",
            "course10": "no",
            "course11": "no",
            "course12": "no",
            "course13": "no",
            "course14": "no",
            "course15": "no",
            "course16": "no",
            "course17": "no",
            "course18": "no",
            "course19": "no",
          });
          return
        }
      }
    );
  }

  openDeleteStudentModal(s: Student) {
    this.askedDeleteStudent = s.name;
    this.modalService.open(this.modal_delete_1, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      (result) => {
        if (result === 'delete') {
          const modal2 = this.modalService.open(this.modal_delete_2, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
            (result2) => {
              if (result2 === 'delete') {
                this.deleteStudent(s.uni_id);
                this.askedDeleteStudent = '';
              }
            }
          );
        }
      }
    );
    
  }

  deleteStudent(id: string) {
    STUDENT_DATA = STUDENT_DATA.filter((student) => student.uni_id !== id);
    this.refreshStudents();
  }

  nextSlide(carousel) {
    if (this.newStudentForm.valid) {
      carousel.select("secondstep");
      this.createButtonText = "Crear";
      this.backButton = false;
      this.nextButton = true;
    }
    else {
      this.toastr.error('Por favor, rellene todos los campos obligatorios');
    }
  }

  backSlide(carousel) {
    carousel.select("firststep");
    this.createButtonText = "Siguiente";
    this.backButton = true;
    this.nextButton = false;
  }

  selectCourse(course: HTMLElement) {
    if (course.classList.contains("course-deactivated")) {
      this.newStudentForm.controls['courses'].value[course.classList[2]] = "ac";
      course.classList.remove("course-deactivated");
      course.classList.add("course-activated");
    }
    else {
      this.newStudentForm.controls['courses'].value[course.classList[2]] = "no";
      course.classList.remove("course-activated");
      course.classList.add("course-deactivated");
    }

  }
}
