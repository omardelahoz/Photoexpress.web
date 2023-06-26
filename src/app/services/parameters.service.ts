import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { AppSettings } from '../appSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends GeneralService {

  urlGetAllParams = 'Parameter/GetAll'

  constructor(
    public _http: HttpClient
  ) { 
    super(_http)
  }

  getAll<T>() : Observable<T> {
    let url:string = `${AppSettings.API_ENDPOINT}${this.urlGetAllParams}`
    return this.getMethod(url)
  }

}
