import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  // Show modal on component load
  isModalOpen: boolean = true;

  selectedFile: File | null = null;
  uploadProgress: number = 0;
  userId: string | null = null;
  username: string | null = null;
  profilePic: string | null = null;
  caption: string = "";
  // We use one preview property for both image and video
  imgPreview: any;
  isUploading: boolean = false;
  uploadSuccess: boolean = false;
  errorMessage: string | null = null;

  private readonly MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

  private readonly ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  private readonly ALLOWED_VIDEO_TYPES = [
    "video/mp4",
    "video/ogg",
    "video/webm",
    "video/avi",
    "video/mpeg",
  ];

  videoExtensions =
    /\.(mp4|m4v|mov|wmv|avi|flv|mkv|webm|3gp|3g2|ts|m2ts|mts|vob|ogv|rm|divx|asf|f4v|mpeg|mpg)$/i;
  audioExtensions =
    /\.(mp3|wav|aac|ogg|m4a|flac|wma|aiff|alac|amr|opus|mid|midi|caf|ra|mka)$/i;
  imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {
      }
}
