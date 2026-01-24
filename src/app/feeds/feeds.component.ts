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

  pageNumber = 1;
  pageSize = 5;

  loading = false;
  allFeedsLoaded = false;

  userId: string | undefined;
  
  reportPopupOpen: boolean = false; 
  selectedFeedForReport: any = null;
  reportSubmitted: boolean = false;

  constructor(
    private feedService: FeedService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log("FeedsComponent loaded.");
  
      this.sharedService.getUserId().subscribe((userId) => {
      this.userId = userId || undefined;
    });
      this.loadFeeds();
  }
  loadFeeds(): void {
    if (this.loading || this.allFeedsLoaded) {
      return;
    }
    this.loading = true;

    this.feedService
      .getFeeds(this.pageNumber, this.pageSize, this.userId)
      .subscribe(
        (response: any) => {
          const newFeeds = response?.blogPostsMostRecent || [];

          if (newFeeds.length > 0) {
            this.feeds = [...this.feeds, ...newFeeds];
            this.pageNumber++;
          } else {
            this.allFeedsLoaded = true;
          }

          this.loading = false;
        },
        (error) => {
          console.error("Error loading feeds:", error);
          this.loading = false;
        }
      );
  }


  likePost(feed: any): void {}
  toggleComments(feed: any): void {}
  openReportPopup(feed: any): void {}
  closeReportPopup(): void {}
}