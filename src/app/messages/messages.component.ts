import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FeedService } from "../services/feed.service";
import { SharedService } from "../services/shared.service";
import { Feed } from "../models/feed.model";

@Component({
  selector: "messagespage",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
  feeds: Feed[] = [];
  userId: any;
  username: any;
  public receivedMessages: any[] = [];
  public chatList: any[] = [];
  message: string = "";
  chat_with_userId: any;
  chat_with_username: any;
  chat_with_profilepic: any;
  chatId: string | null = null;
  sidebarVisible: boolean = true;
  loading: boolean = false;
  isSendingMessage: boolean = false;

  @ViewChild("chatBody") chatBody!: ElementRef;

  constructor(
    private feedService: FeedService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}
  ngAfterViewChecked() {}
  ngOnDestroy() {}

  toggleSidebar() {}
  selectChatUser(user: any) {}
  startAudioCall() {}
  startVideoCall() {}
  sendMessage() {}
  onEnter(event: any) {}
  
  checkNewChat() {}
  getChats(uid: any) {}
  loadChatHistory(id: string) {}
  private scrollToBottom(force: boolean = false) {}
}