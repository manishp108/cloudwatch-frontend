import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { UserData } from "../models/user-data.model";
import { UserService } from "../services/user.service";
import { environment } from "../environment";
import { Router } from "@angular/router";

declare const google: any;
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  profileImgError: boolean = false;
  generatedUserData: UserData = new UserData("", "", "", "", "", "false");
  profileDropdownOpen: boolean = false;
  signedIn: boolean = false;

  constructor(
    private userService: UserService,
    // private dialog: MatDialog,
    private sharedService: SharedService,
    // private signalRService: SignalRService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {}
    formatUsername(username: string): string {
    if (!username) return "";
    return username.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  getDisplayName(user: UserData): string {
    if (user.firstName.trim() || user.lastName.trim()) {
      return (user.firstName + " " + user.lastName).trim();
    }
    return user.username ? this.formatUsername(user.username) : "";
  }

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  setPersistentData(userData: UserData): void {
    const fields = ['userId', 'firstName', 'lastName', 'profilePic', 'isVerified', 'username'];
    fields.forEach(field => {
      const value = (userData as any)[field];
      this.setCookie(field, value, 365);
      localStorage.setItem(field, value);
    });
  }

  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  
   }
}
