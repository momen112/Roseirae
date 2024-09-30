import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://roseirae.runasp.net/api/Users/all';
  private apiIdUrl = 'https://roseirae.runasp.net/api/Users';

  private deleteapiUrl = 'https://roseirae.runasp.net/api/Users/delete/';

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) { }

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(this.apiUrl, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.deleteapiUrl}${userId}`;
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.delete(url, { headers });
  }

  getUserById(userId: string): Observable<User> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get<User>(`${this.apiIdUrl}/${userId}`, { headers });
  }

 editUser(userId: string, userData: any): Observable<any> {
    const url = 'https://roseirae.runasp.net/api/Users/edit'; // Ensure this URL is correct
    const token = localStorage.getItem('userToken');

    // Check if token exists
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Specify JSON content type
    });

    // Prepare payload (Make sure it matches the expected structure)
    const payload = { userId, ...userData };

    return this._HttpClient.put(url, payload, { headers });
}

}
