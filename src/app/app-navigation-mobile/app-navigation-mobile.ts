import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navigation-mobile',
  templateUrl: './app-navigation-mobile.html',
  styleUrls: ['./app-navigation-mobile.css']
})
export class AppNavigationMobileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  activeItem: string = 'home';
  userProfilePic = '';
  profileImgError = false;
  userInitial = '?';

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.getUsername()
      .pipe(takeUntil(this.destroy$))
      .subscribe(username => {
        if (username) {
          this.userInitial = username.charAt(0).toUpperCase();
        }
      });

    this.sharedService.getProfilePic()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profilePic => {
        if (profilePic) {
          this.userProfilePic = profilePic;
        }
      });

    // Set active item based on current route
    this.setActiveFromRoute(this.router.url);
    
    // Listen for route changes
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setActiveFromRoute(this.router.url);
      });
  }

  setActive(item: string): void {
    this.activeItem = item;
  }

  private setActiveFromRoute(url: string): void {
    const route = url.split('/')[1];
    this.activeItem = route || 'home';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}