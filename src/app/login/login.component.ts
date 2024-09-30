import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordService } from '../password.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _PasswordService: PasswordService) { }

  isloading: boolean = false;
  modalVisible: boolean = false;
  errormessage: string = '';
  // create the object in the api 
  loginExistUser = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    password: new FormControl(null, [Validators.required])
  });




  loginUser(data: FormGroup) {
    this.isloading = true;
    this._AuthService.login(data.value).subscribe({
      next: (response) => {

        if (response.token) {
          localStorage.setItem('userToken', response.token);
          this._AuthService.decodeUserToken();
          this._Router.navigate(['/dashboard']);
        } else {
          this.errormessage = "Invalid response from server, no token found.";
          this.isloading = false;
        }


        // here We can Put A popUp For The Wrrong message
      },
      error: (myError) => {
        console.log(myError);
        this.errormessage = myError.message;
        this.isloading = false;

      },
      complete: () => {
        this.isloading = false;

      },

    });
    console.log(data.value);
  }
  navigateToRecoveryPage() {
    this._Router.navigate(['/password-recovery']);
  }

  openPasswordRecoveryModal() {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;

  }


  passwordStatusMessage: string = '';

  recoveryForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  openVerifyingModal: boolean = false;

  sendOtp() {
    if (this.recoveryForm.valid) {
      this._PasswordService.sendOtp(this.recoveryForm).subscribe({
        // here the status is 200
        next: (res) => {
          console.log(res);
          this.passwordStatusMessage = res.message;
          this.VerificationForm.get('email')?.setValue(this.recoveryForm.get('email')?.value);
          this.openVerifyingModal = true;

        },
        error: (error) => {
          console.error(error);
          this.passwordStatusMessage = error.error.message;
        }
      });
    } else {
      this.passwordStatusMessage = 'Please enter a valid email address.';
    }
  }


  VerificationForm = new FormGroup({
    email: new FormControl(),
    otp: new FormControl(null, Validators.required)
  });


  otpStatusMessage: string = '';


  sendVerification() {
    console.log(this.recoveryForm.value)
    console.log(this.VerificationForm.value);
    if (this.VerificationForm.valid) {
      this._PasswordService.verifyOtp(this.VerificationForm).subscribe({
        // here the status is 200
        next: (res) => {
          console.log(res);
          this.verificationStatusMessage = res.message;
          this.ResettPaswordFrom.get('email')?.setValue(this.recoveryForm.get('email')?.value);
          this.openResettPassword = true;

        },
        error: (error) => {
          console.error(error);
          this.verificationStatusMessage = error.error.message;
        }
      });
    } else {
      this.verificationStatusMessage = 'A7A';
    }
  }

  verificationStatusMessage: string = '';

  closeVerifyModal() {
    this.openVerifyingModal = false;
  }

  openResettPassword: boolean = false;


  ResettPaswordFrom = new FormGroup({
    email: new FormControl(),
    newPassword: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),

  });
  ResettPaswordNow() {
    if (this.ResettPaswordFrom.valid) {
      this._PasswordService.resetPassword(this.ResettPaswordFrom).subscribe({
        // here the status is 200
        next: (res) => {
          console.log(res);
          this.verificationStatusMessage = res.message;
          this.openResettPassword = true;

        },
        error: (error) => {
          console.error(error);
          this.verificationStatusMessage = error.error.message;
        }
      });
    } else {
      this.verificationStatusMessage = 'A7A';
    }
  }


  closeResetPassword() {
    this.openResettPassword = false;
  }

}
