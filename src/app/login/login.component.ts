import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){} 

  isloading:boolean = false ;
  errormessage:string='';

  // create the object in the api 
    loginExistUser = new FormGroup({
    userName:new FormControl(null,[Validators.required , Validators.minLength(2) , Validators.maxLength(25)]),
    password:new FormControl(null,[Validators.required])  
  });
  

  loginUser(data:FormGroup){
    this.isloading=true;
    this._AuthService.login(data.value).subscribe({
      next:(response)=>{
        console.log(response);
        localStorage.setItem('userToken',response.token);
        this._AuthService.decodeUserToken();
        this._Router.navigate(['/dashboard']);

        // here We can Put A popUp For The Wrrong message
      },
      error:(myError)=>{
        console.log(myError);
       this.errormessage =myError.message;
        this.isloading=true;

      },
      complete:()=>{
        this.isloading=false;

      },
      
    });
    console.log(data.value);
  }


  
}
