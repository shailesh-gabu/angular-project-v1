import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';

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

  constructor(private fb: FormBuilder, public router: Router) {
    console.log('logindata', this.loginForm);
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

  async onSubmit() {
    let studentUsername = this.loginForm.value.userName;
    let studentPassword = this.loginForm.value.password;
    let enteredCaptcha = this.loginForm.value.captcha;
    console.log(studentPassword, studentUsername, enteredCaptcha);

    if (this.generatedCaptcha == enteredCaptcha) {
      if (studentUsername == '11111111' && studentPassword == 22222222) {
        this.isOtpSend = true;
        this.otp = Math.floor(Math.random() * 10000);
        this.sendEmailOtp();
        alert(this.otp);
      } else {
        alert('username / password invalid');
      }
    } else {
      alert('invalid captcha');
    }

    console.log(this.loginForm.value);
  }

  onOtpSubmit() {
    let enteredOtp = this.otpForm.value.userOtp;
    console.log(enteredOtp);
    if (this.otp == enteredOtp) {
      this.router.navigateByUrl('student-details');
    } else {
      alert('invalid Otp');
    }
  }

  async sendEmailOtp() {
    emailjs.init({
      publicKey: 'tXemizdoiPh0-nWzO',
    });
    let response = await emailjs.send('service_5l5g2yo', 'template_7kl0oyl', {
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

  // VERIFY OTP

  // function sendEmail() {
  //   var settings = {
  //     url: "https://send.api.mailtrap.io/api/send",
  //     method: "POST",
  //     timeout: 0,
  //     headers: {
  //       Authorization: "Bearer c83e752ff36277538d3b2a9e083d8dee",
  //       "Content-Type": "application/json",
  //     },
  //     data: JSON.stringify({
  //       from: {
  //         email: "mailtrap@demomailtrap.com",
  //         name: "Mailtrap Test",
  //       },
  //       to: [
  //         {
  //           email: "shaileshgabu1431@gmail.com",
  //         },
  //       ],
  //       template_uuid: "ec87c310-13db-46fc-a840-da29693f4539",
  //       template_variables: {
  //         company_info_name: "Test_Company_info_name",
  //         name: "Test_Name",
  //         company_info_address: "Test_Company_info_address",
  //         company_info_city: "Test_Company_info_city",
  //         company_info_zip_code: "Test_Company_info_zip_code",
  //         company_info_country: "Test_Company_info_country",
  //       },
  //     }),
  //   };

  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   });
  // }

  //   function sendEmail() {
  //     otp = Math.floor(Math.random() * 10000);
  //     emailBody = `<h1>your otp is </h1> ${otp}`;
  //     alert(otp);
  //     Email.send({
  //       SecureToken: "1254ca97-566a-4511-bb44-a6e63667afbc",
  //       To: "shaileshgabu1431@gmail.com",
  //       From: "shaileshgabu1431@gmail.com",
  //       Subject: "Verification otp",
  //       Body: emailBody,
  //     }).then((message) => alert(message));
  //   }

  // token: string | null = localStorage.getItem('authToken') || '';

  // name: any = '';
  // password: any = '';

  // constructor(private router: Router) {}

  // generateToken(length: number): string {
  //   let jwtToken = '';
  //   const characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     jwtToken += characters.charAt(
  //       Math.floor(Math.random() * charactersLength)
  //     );
  //   }
  //   return jwtToken;
  // }

  // onLogin() {
  //   if (this.name == 'gabu' && this.password == '123') {
  //     const randomToken = this.generateToken(32);
  //     localStorage.setItem('authToken', randomToken);
  //     this.token = randomToken;
  //     console.log('Token:', this.token);
  //     this.router.navigateByUrl('home');
  //   } else {
  //     alert('user name and password not match');
  //   }
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('authToken');
  // }
}
