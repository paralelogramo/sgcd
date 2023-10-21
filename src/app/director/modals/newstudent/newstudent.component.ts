import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newstudent',
  templateUrl: './newstudent.component.html',
  styleUrls: ['./newstudent.component.css']
})
export class NewstudentComponent {

  newStudentForm: FormGroup;

  backButton: boolean = true;
  nextButton: boolean = false;

  constructor(
    
  ) {

  }
}
