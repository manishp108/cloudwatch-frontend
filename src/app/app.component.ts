import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
   // Initialize UserData object with profilePic
  isMobileView: boolean = false; // Flag to track if the view is mobile


  ngOnInit() {
    const userId = this.getCookie("userId");
    const username = this.getCookie("username");
    const firstName = this.getCookie("firstName");
    const lastName = this.getCookie("lastName");
    const profilePic = this.getCookie("profilePic");
    const googleVerified = this.getCookie("googleVerified");

    if (userId && username && profilePic) {
  ;
    } else {
      this.generateAndStoreUser(true); // Generate new data if no cookies
    }
     // Check if the device is mobile
  }

  generateAndStoreUser(storeCookies: boolean) {
    
    
        
  }

  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
}
