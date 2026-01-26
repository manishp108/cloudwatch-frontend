import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private profilePicSubject = new BehaviorSubject<string | null>(null);

  // Return empty/default values so the FeedsComponent doesn't break
  getUserId(): Observable<string | null> {
    return of(null);
  }

  getUsername(): Observable<string | null> {
    return of('Guest');
  }

  getProfilePic(): Observable<string> {
    return of('assets/images/default-avatar.jpg');
  }

  setChatUserInfo(id: any, name: any, title: any) {
    // Logic removed for empty feed state
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