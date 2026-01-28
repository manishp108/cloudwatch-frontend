import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FeedService } from "../services/feed.service";
import { ChatService } from "../services/chat.service";
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
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog
  ) {}

    
  ngOnInit() {
    // Subscribe for userId and username from shared service (or cookies)
    this.sharedService.getUserId().subscribe((userId) => {
      this.userId = userId;
    });
    this.sharedService.getUserId().subscribe((username) => {
      this.username = username;
    });

    const uId = this.sharedService.getCookie("userId");
    if (uId) {
      this.userId = uId;
      this.checkNewChat();
      this.getChats(uId);
    }


  }
  
  loadChatHistory(chatId: string) {
    this.chatService.getChatHistory(chatId).subscribe(
      (history: any[]) => {
        this.receivedMessages = history.map((msg) => ({
          message: msg.content,
          type: msg.senderId === this.userId ? "reply" : "sender",
          msgtime: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        this.chatId = chatId;
        setTimeout(() => this.scrollToBottom(true), 0);
      },
      (error) => {
        console.error("Error loading chat history:", error);
      }
    );
  }
  checkNewChat() {
    this.sharedService
      .getchat_UserId()
      .subscribe(
        (chat_with_userId) => (this.chat_with_userId = chat_with_userId)
      );
    this.sharedService
      .getchat_Username()
      .subscribe(
        (chat_with_username) => (this.chat_with_username = chat_with_username)
      );
    this.sharedService
      .getchat_ProfilePic()
      .subscribe(
        (chat_with_profilepic) =>
          (this.chat_with_profilepic = chat_with_profilepic)
      );
  }
  
  getChats(uid: any) {
    if (this.loading) return;
    this.loading = true;
    this.chatService.getChatUsers(uid).subscribe(
      (response: any[]) => {
        this.chatList = response;
        this.loading = false;
        if (
          !this.chat_with_userId &&
          this.chatList &&
          this.chatList.length > 0
        ) {
          let chatUser = this.chatList[0];
          this.chat_with_userId = chatUser.userId;
          this.chat_with_username = chatUser.username;
          this.chat_with_profilepic = chatUser.profilePicUrl;
          this.chatId = chatUser.chatId || null;
          if (this.chatId) {
            this.loadChatHistory(this.chatId);
          }
        }
      },
      (error) => {
        this.loading = false;
        console.error("Error loading chat users:", error);
      }
    );

  }
  
  ngAfterViewChecked() {}
  ngOnDestroy() {}

  toggleSidebar() {}

  selectChatUser(user: any): void {
    console.log("User clicked:", user);
    this.chat_with_userId = user.userId;
    this.chat_with_username = user.username;
    this.chat_with_profilepic = user.profilePicUrl;
    if (user.chatId) {
      user.newMessage = false;
      this.chatId = user.chatId;
      this.loadChatHistory(this.chatId!);
    } else {
      this.chatId = null;
      this.receivedMessages = [];
    }
    // Hide the sidebar on mobile view once a user is selected.
    this.sidebarVisible = false;
  }

  startAudioCall() {}
  startVideoCall() {}
  sendMessage() {}
  onEnter(event: any) {}
  
  private scrollToBottom(force: boolean = false): void {
    try {
      if (this.chatBody && this.chatBody.nativeElement) {
        const element = this.chatBody.nativeElement;
        if (
          force ||
          element.scrollHeight - element.scrollTop - element.clientHeight < 100
        ) {
          element.scrollTop = element.scrollHeight;
        }
      }
    } catch (err) {
      console.error("Error scrolling chat to bottom:", err);
    }
  }

}