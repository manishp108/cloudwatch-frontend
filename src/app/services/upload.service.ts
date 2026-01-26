import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/Feeds/uploadFeed`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );

    return this.http.request(req);
  }

  deleteFile(feedUrl: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/Feeds/delete?feedUrl=${encodeURIComponent(feedUrl)}`
    );
  }
}
