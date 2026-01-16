import { Component, OnInit } from "@angular/core";
import { FeedService } from "../services/feed.service";
import { SharedService } from "../services/shared.service";

@Component({
  selector: "feedspage",
  templateUrl: "./feeds.component.html",
  styleUrls: ["./feeds.component.css"],
})
export class FeedsComponent implements OnInit {
  feeds: any[] = [];
  loading: boolean = false;
  allFeedsLoaded: boolean = true;
  
  // These must be defined to fix the TS2339 error in your HTML
  reportPopupOpen: boolean = false; 
  selectedFeedForReport: any = null;
  reportSubmitted: boolean = false;

  constructor(
    private feedService: FeedService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log("FeedsComponent loaded in development mode.");
  }

  // Placeholder methods so the buttons in your HTML don't cause errors
  likePost(feed: any): void {}
  toggleComments(feed: any): void {}
  openReportPopup(feed: any): void {}
  closeReportPopup(): void {}
}