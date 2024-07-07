import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  @Input() selectedStudentData: any;
  constructor(public router: Router) {
    console.log('selectedStudentData', this.selectedStudentData);
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
