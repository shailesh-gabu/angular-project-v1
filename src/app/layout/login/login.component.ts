import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { studentList } from 'src/app/shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public otpForm!: FormGroup;
  isOtpSend: boolean = false;
  otp: any;
  generatedCaptcha: any;
  studentData = studentList;

  constructor(private fb: FormBuilder, public router: Router) {
    this.generate();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
    });
    this.otpForm = this.fb.group({
      userOtp: ['', [Validators.required]],
    });
  }

  details: any;
  async onSubmit() {
    let studentUsername = this.loginForm.value.userName;
    let studentPassword = this.loginForm.value.password;
    let enteredCaptcha = this.loginForm.value.captcha;
    // console.log(studentPassword, studentUsername, enteredCaptcha);

    if (this.generatedCaptcha == enteredCaptcha) {
      this.studentData.map((item) => {
        if (
          studentUsername == item.registerNo &&
          studentPassword == item.password
        ) {
          this.details = item;

          this.isOtpSend = true;
          const otp = Math.floor(1000 + Math.random() * 9000);
          this.otp = otp.toString();
          this.sendEmailOtp();
        } else {
          alert('Invalid Username or Password');
        }
      });
    } else {
      alert('invalid captcha');
    }
    // console.log(this.loginForm.value);
  }

  onOtpSubmit() {
    let enteredOtp = this.otpForm.value.userOtp;
    // console.log(enteredOtp);
    if (this.otp == enteredOtp) {
      this.router.navigateByUrl(
        `student-details?registerNo=${this.details.registerNo}`
      );
    } else {
      alert('invalid Otp');
    }
  }

  async sendEmailOtp() {
    emailjs.init({
      publicKey: '5g9ZYtBZ7KPeUD-wY',
    });
    let response = await emailjs.send('service_eqvhzdm', 'template_txhs1tc', {
      otp: this.otp,
      student_email: 'shaileshgabu24@gmail.com',
      brand_name: 'Gujarat University',
    });
    alert('OTP has been Sent your Register Email');
  }

  // GENERATE CAPTCHA
  generate() {
    let uniqueChar = '';
    const randomChar =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 1; i < 5; i++) {
      uniqueChar += randomChar.charAt(Math.random() * randomChar.length);
    }
    this.generatedCaptcha = uniqueChar;
  }
}
