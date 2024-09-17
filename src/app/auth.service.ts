import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable , BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile=new BehaviorSubject(null);
  constructor(private _HttpClient : HttpClient , private _Router :Router) { }
  // To Decode The Token
    userData(){
      let encoded : any = localStorage.getItem('userToken');
      let decoded : any = jwtDecode(encoded);
      this.userProfile.next(decoded); 
    }

  register(data:FormGroup): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , data)
  }

  login(data:FormGroup): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , data)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userProfile.next(null);
    this._Router.navigate(['/login']);
  }
  
}
