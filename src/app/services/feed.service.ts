import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Feed } from "../models/feed.model";
import { environment } from "../environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FeedService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFeeds(
    pageNumber: number,
    pageSize: number,
    userId?: string
  ): Observable<Feed[]> {
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());
    if (userId) {
      params = params.set("userId", userId);
    }
    const headers = new HttpHeaders({
      "Cache-Control": "public, max-age=3600",
      Pragma: "cache",
    });
    return this.http.get<Feed[]>(`${this.apiUrl}/Feeds/getUserFeeds`, {
      params,
      headers,
    });
  }
}