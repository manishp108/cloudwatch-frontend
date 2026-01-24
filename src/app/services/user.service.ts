import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../models/user-data.model';
import { environment } from '../environment';  

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}
  
generateUserId(): Observable<UserData> {
    const sanitizedUrl = `${this.apiUrl}/Users/create`.trim().replace(/\s+/g, '');
    return this.http.get<UserData>(sanitizedUrl);
  }
  getUser(userId: any): Observable<UserData> {
    const sanitizedUrl = this.apiUrl + "/Users/getUser/?userId=" + userId;
    return this.http.get<UserData>(sanitizedUrl);
  }
  verifyGoogleToken(token: string): Observable<UserData> {
    return this.http.post<UserData>(`${this.apiUrl}/Account/google-verify-token`, { token });
  }
}
