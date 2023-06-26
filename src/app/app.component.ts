import { Component } from '@angular/core';
import { ParametersService } from './services/parameters.service';
import { Result } from './models/result';
import { Parameter } from './models/parameter';
import { AppSettings } from './appSettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photoexpress.web';

  constructor(
    private paramservice: ParametersService
  ){
    this.consultarParam()
  }
  consultarParam(){
    this.paramservice.getAll<Result<Parameter>>()
    .subscribe( (resp: Result<Parameter>) => {
      
      let index = resp.resultList.findIndex( p => p.name == 'AdditionalValue')
      if(index > -1){
        AppSettings.ADDITIONALVALUE = parseInt(resp.resultList[index].value) 
      }

      index = resp.resultList.findIndex( p => p.name == 'BaseValue')
      if(index > -1){
        AppSettings.BASEVALUE = parseInt(resp.resultList[index].value) 
      }

    })
  }
}
