import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable , BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile= new BehaviorSubject(null);

  constructor(private _HttpClient : HttpClient , private _Router :Router) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  register(data:FormGroup):Observable <any>{
 
    return this._HttpClient.post('http://roseirae.runasp.net/api/Users/register' , data,{ headers: this.getHeaders() });

  }

  login(data:FormGroup):Observable <any>{
    
    return this._HttpClient.post('http://roseirae.runasp.net/api/Users/login' , data);

  }

  decodeUserToken() {
    let encodedToken: any = localStorage.getItem('userToken');
    if (encodedToken) {
        let decoded: any = jwtDecode(encodedToken);
        this.userProfile.next(decoded);
        console.log(decoded);
    }
}


  logout(){
    localStorage.removeItem('userToken');
    this.userProfile.next(null);
    this._Router.navigate(['/login'])
  }
  
}


