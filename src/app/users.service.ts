import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://roseirae.runasp.net/api/Users/all';

  constructor(private _HttpClient: HttpClient) { } 
  getAllUsers(): Observable<any> {
    // Retrieve the token from local storage or other secure storage
    const token = localStorage.getItem('userToken'); // Adjust as needed

    // Create headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(this.apiUrl, { headers });
  }
}
