import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
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
}