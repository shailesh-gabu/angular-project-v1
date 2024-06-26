import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  @Input() selectedStudentData: any;
  constructor() {
    console.log('selectedStudentData', this.selectedStudentData);
  }
}
