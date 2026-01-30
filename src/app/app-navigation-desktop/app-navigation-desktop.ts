import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './app-navigation-desktop.html',
  styleUrls: ['./app-navigation-desktop.css'],
  imports: [CommonModule, RouterModule] 
})

export class AppNavigationDesktopComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  activeItem: string = 'home';
  profileImgError = false;
  userName = '';
  userProfilePic = '';
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
          this.userName = username;
          this.userInitial = username.charAt(0).toUpperCase();
        }
      });

    this.sharedService.getProfilePic()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profilePic => {
        if (profilePic) {
          this.userProfilePic = profilePic;
          this.profileImgError = false;
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