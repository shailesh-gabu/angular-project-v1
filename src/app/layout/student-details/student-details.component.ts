import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { studentList } from 'src/app/shared/constant';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  @Input() selectedStudentData: any;
  studentData = studentList;
  details: any;
  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.studentData.map((item) => {
        if (item.registerNo == params['registerNo']) {
          this.details = item;
        }
      });
    });
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
