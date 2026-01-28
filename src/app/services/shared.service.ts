import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private profilePicSubject = new BehaviorSubject<string | null>(null);


 private chat_userIdSubject = new BehaviorSubject<string | null>(null);
  private chat_usernameSubject = new BehaviorSubject<string | null>(null);
  private chat_profilePicSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Check for an existing userId in the cookie when the service initializes.
    const cookieUserId = this.getCookie("userId");
    if (cookieUserId) {
      this.userIdSubject.next(cookieUserId);
    } 
  }
  // Return empty/default values so the FeedsComponent doesn't break
  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

 
  getchat_UserId(): Observable<string | null> {
    return this.chat_userIdSubject.asObservable();
  }

  getchat_Username(): Observable<string | null> {
    return this.chat_usernameSubject.asObservable();
  }

  getchat_ProfilePic(): Observable<string | null> {
    return this.chat_profilePicSubject.asObservable();
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  }
 
  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }  
  setUserInfo(userId: string, username: string, profilePic: string): void {
    this.userIdSubject.next(userId);
    this.usernameSubject.next(username);
    this.profilePicSubject.next(profilePic);
  }      
}