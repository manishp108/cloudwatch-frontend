import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FeedService {
  // Returns an empty list of feeds instantly
  getFeeds(pageNumber: number, pageSize: number, userId?: string): Observable<any> {
    return of({ blogPostsMostRecent: [] });
  }

  getPostComments(postId: any): Observable<any[]> {
    return of([]);
  }

  // Placeholder methods to prevent compilation errors
  likeUnlikePost(data: any): Observable<any> { return of({}); }
  postComment(data: any): Observable<any> { return of({}); }
  updatePostComment(id: any, content: any): Observable<any> { return of({}); }
  deletePostComment(id: any): Observable<any> { return of({}); }
  reportPost(data: any): Observable<any> { return of({}); }
}