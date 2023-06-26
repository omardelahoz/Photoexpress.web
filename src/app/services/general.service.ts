import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  constructor(
    public http: HttpClient
  ) { }

  postMethod<T>(url: string, body: string, authorization: boolean = false): Observable<T> {
    if (authorization) {
      let token = localStorage.getItem("token")
      return this.http.post<T>(url, body, { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'ip': '127.0.0.1', 'Authorization': 'Bearer ' + token } })
    }
    else {
      return this.http.post<T>(url, body, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
    }
  }
  getMethod<T>(url: string, authorization: boolean = false): Observable<T> {    
    if (authorization) {
      let token = localStorage.getItem("token")
     
      return this.http.get<T>(url, { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'ip': '127.0.0.1', 'Authorization': 'Bearer ' + token } })
    }
    else {
      return this.http.get<T>(url, { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'ip': '127.0.0.1' } });
    }
  }
  putMethod<T>(url: string, body: string, authorization: boolean = false): Observable<T> {
    if (authorization) {
      let token = localStorage.getItem("token")
      return this.http.put<T>(url, body, { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'ip': '127.0.0.1', 'Authorization': 'Bearer ' + token } })
    }
    else {
      return this.http.put<T>(url, body, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
    }
  }
  deleteMethod<T>(url: string, authorization: boolean = false): Observable<T> {
    if (authorization) {
      let token = localStorage.getItem("token")
      return this.http.delete<T>(url, { headers: { 'Content-Type': 'application/json', 'ip': '127.0.0.1', 'Authorization': 'Bearer ' + token } })
    }
    else {
      return this.http.delete<T>(url, { headers: { 'Content-Type': 'application/json' } })
    }
  }
}
