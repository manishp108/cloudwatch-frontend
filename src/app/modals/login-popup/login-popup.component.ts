import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { UserData } from "../../models/user-data.model";
import { SharedService } from "../../services/shared.service";
@Component({
  selector: "app-login-popup",
  templateUrl: "./login-popup.component.html",
  styleUrls: ["./login-popup.component.css"],
})
export class LoginPopupComponent implements OnInit {
  message: any;
  secretKey: string | null = null;
  generatedUserData: UserData = new UserData("", "", "", "", "", "false");

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}
  }

