import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup , PatternValidator, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrls: ['./createnew.component.css']
})
export class CreatenewComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){} 

  isloading:boolean = false ;
  errormessage:string='';

  // create the object in the api 
    regeisterNewUser = new FormGroup({
    userName:new FormControl(null,[Validators.required , Validators.minLength(2) , Validators.maxLength(25)]),
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required]),
    // rePasword:new FormControl(null,[Validators.required]),
    phoneNumber:new FormControl(null,[Validators.required , Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
    role:new FormControl(null,[Validators.required , Validators.pattern(/(Admin|User)/)])
    
  });
  

  createNewUser(data:FormGroup){
    this.isloading=true;
    this._AuthService.register(data.value).subscribe({
      next:(response)=>{
        console.log(response);

          this._Router.navigate(['/users']);
        
        // here We can Put A popUp For The Wrrong message
      },
      error:(myError)=>{
        console.log(myError);
       this.errormessage =myError.message;
        this.isloading=false;

      },
      complete:()=>{
        this.isloading=false;

      },
      
    });
    console.log(data.value);
  }
}
