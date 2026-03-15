import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
const { stage, backendHost } = environment;
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  public reqHeader = new HttpHeaders();
  public token = localStorage.getItem('token');

  createHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
  }

  createDocument(request: any): Observable<any> {
    return this.http.post(`${backendHost}/documents`, request, {
      headers: this.createHeader(),
    });
  }

  updateDocument(id: number, request: any): Observable<any>{
        return this.http.put(`${backendHost}/documents/${id}`, request, {
      headers: this.createHeader(),
    });
  }

  getDocumentById(id: number): Observable<any> {
    return this.http.get(`${backendHost}/documents/detail?id=${id}`, {
      headers: this.createHeader(),
    });
  }
  getDocumentArchiveById(id: number): Observable<any> {
    return this.http.get(`${backendHost}/documents/${id}/download`, {
      headers: this.createHeader(),
      responseType: 'blob',
      observe: 'response',
    });
  }

  getDocuments(
    title: string,
    status: any,
    page: any,
    size: any,
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (title) {
      params = params.set('title', title);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get(`${backendHost}/documents`, {
      params,
      headers: this.createHeader(),
    });
  }

  updateFile(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${backendHost}/documents/${id}/upload`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

    updateArchiveExistent(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${backendHost}/documents/${id}/update/archive`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
