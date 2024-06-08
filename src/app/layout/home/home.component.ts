import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myControl = new FormControl('');
  selectedStudentData: any = null;
  options: any = [
    {
      name: 'Sam Anderson',
      registerNo: '856421',
      studentId: '123456',
      email: 'example@gmail.com',
      Phone: '7777777777',
      dob: '15/01/1996',
      profile:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOme6vZXapI-HTNJXRwstlO_vjjF59Wt6cQ&s',
    },
    {
      name: 'melony wagon',
      registerNo: '856422',
      studentId: '123457',
      email: 'example@gmail.com',
      Phone: '5555555555',
      dob: '18/08/1991',
      profile:
        'https://www.shutterstock.com/image-photo/self-portrait-beautiful-chinese-girl-260nw-1289866381.jpg',
    },
    {
      name: 'reddle mark',
      registerNo: '856423',
      studentId: '123458',
      email: 'example@gmail.com',
      Phone: '6666666666',
      dob: '12/11/1995',
      profile:
        'https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg',
    },
  ];
  filteredOptions!: Observable<any>;
  selectedVariable: string = '';

  constructor(private router: Router) {}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) =>
      option.registerNo.toLowerCase().includes(filterValue)
    );
  }

  token: string | null = localStorage.getItem('authToken') || '';

  onLogout() {
    localStorage.removeItem('authToken');
    this.token = null;
    console.log('Logged out');
    this.router.navigateByUrl('login');
  }

  onOptionSelected(event: any) {
    console.log(event.option);
    this.selectedVariable = event.option.value;
    this.selectedStudentData = this.options.find(
      (option: any) => option.registerNo === this.selectedVariable
    );
    console.log('Selected Object:', this.selectedStudentData);
  }
}
