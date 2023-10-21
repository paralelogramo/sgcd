import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css']
})
export class ViewstudentComponent {

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() vs: Student;

  backButton: boolean = true;
  nextButton: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public config: NgbCarouselConfig,
  ) {
    config.interval = 0;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    console.log(this.vs)
  }

  closeModal() {
    
  }

  nextSlide(carousel) {
    if (carousel.activeId === "firststep") {
      carousel.select("secondstep");
      this.backButton = false;
      this.nextButton = false;
    }
    else if (carousel.activeId === "secondstep") {
      carousel.select("thirdstep");
      this.backButton = false;
      this.nextButton = true;
    }
  }

  backSlide(carousel) {
    if (carousel.activeId === "thirdstep") {
      carousel.select("secondstep");
      this.backButton = false;
      this.nextButton = false;
    }
    else if (carousel.activeId === "secondstep") {
      carousel.select("firststep");
      this.backButton = true;
      this.nextButton = false;
    }
  }
}
