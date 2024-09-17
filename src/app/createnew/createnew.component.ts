import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup , PatternValidator, Validators} from '@angular/forms';

@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrls: ['./createnew.component.css']
})
export class CreatenewComponent {
  // create the object in the api 
    regeisterNewUser = new FormGroup({
    userName:new FormControl(null,[Validators.required , Validators.minLength(2) , Validators.maxLength(25)]),
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required]),
    rePasword:new FormControl(null,[Validators.required]),
    phoneNumber:new FormControl(null,[Validators.required , Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
    role:new FormControl(null,[Validators.required , Validators.pattern(/(Admin|User)/)])
    
  });

  createNewUser(data:FormGroup){
    console.log(data.value);
  }
}
