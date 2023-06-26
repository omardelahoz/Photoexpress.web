import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { AppSettings } from '../appSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends GeneralService {

  urlAddEvent = 'Event/Save';
  urlGetAllEvents = 'Event/GetAll'

  constructor(
    public _http: HttpClient
  ) { 
    super(_http)
  }

  addEvent<T>(data: any): Observable<T>{
    let url:string = `${AppSettings.API_ENDPOINT}${this.urlAddEvent}`
    return this.postMethod(url, data)
  }

  getAll<T>(orderBy:string, ascendent:boolean, pageIndex:number, pageSize:number) : Observable<T> {
    let url:string = `${AppSettings.API_ENDPOINT}${this.urlGetAllEvents}/${orderBy}/${ascendent}/${pageIndex}/${pageSize}`
    return this.getMethod(url)
  }

}
