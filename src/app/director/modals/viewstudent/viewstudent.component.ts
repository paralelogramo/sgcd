import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../models/student.model';
import { DirectorService } from 'src/app/services/director.service';

interface Module {
  id: string,
  name: string,
  year: number,
  semester: number,
  state: string,
  style: string
}

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css']
})
export class ViewstudentComponent {

  courses

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() vs: Student;

  backButton: boolean = true;
  nextButton: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
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
    this.directorService.getStudentHistory(this.vs.dni).subscribe((history: Module[]) => {
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
    })
  }

  closeModal() {
    
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
  
}
