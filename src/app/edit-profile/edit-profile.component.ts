import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { UserData } from "../models/user-data.model";
import { UserService } from "../services/user.service";
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
  ngOnInit(): void { }
}
