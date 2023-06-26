import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/appSettings';
import { Event } from 'src/app/models/event';
import { Result } from 'src/app/models/result';
import { EventsService } from 'src/app/services/events.service';
import { dayValidation } from 'src/app/validators/customValidator';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  searchForm: FormGroup= new FormGroup({});
  
  constructor(
    private eventsService: EventsService
  ){
    
  }
  ngOnInit(): void {
    this.createForm()
  }

  get institutionName(){
    return this.searchForm.get('institutionName')
  }
  get institutionAddres(){
    return this.searchForm.get('InstitutionAddress')
  }
  get numStudents(){
    return this.searchForm.get('numStudents')
  }
  get year(){
    return this.searchForm.get('year')
  }
  get month(){
    return this.searchForm.get('month')
  }
  get day(){
    return this.searchForm.get('day')
  }
  get hour(){
    return this.searchForm.get('hour')
  }
  
  createForm(){

    let anio = new Date().getFullYear()

    this.searchForm = new FormGroup({
      institutionName: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(5)]),
      InstitutionAddress: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(5)]),
      numStudents: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5000)]),
      baseValue: new FormControl({value: AppSettings.BASEVALUE, disabled: true}, [Validators.required]),
      addiotionalValue: new FormControl({value: 0, disabled: true}, [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.max(9999), Validators.min(anio)]),
      month: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      day: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
      hour: new FormControl('', [Validators.required, Validators.min(0), Validators.max(23)]),
      toga: new FormControl('', [Validators.required]),
      startTime: new FormControl('')
    }, {
      validators: [dayValidation]
    })
    
    if(AppSettings.BASEVALUE == 0){
      let inter = setInterval(()=>{
        const baseValue: FormControl = this.searchForm.get('baseValue') as FormControl;
        baseValue.patchValue(AppSettings.BASEVALUE)
        if(AppSettings.BASEVALUE > 0) clearInterval(inter);
      }, 1000 )      
    }

  }

  add(){
    
    if (this.searchForm.valid){
      this.searchForm.get('startTime')?.patchValue(this.getDate())
      this.eventsService.addEvent<Result<Event>>(this.searchForm.getRawValue())
      .subscribe( resp => {
        if(resp.result){
          alert(resp.message)
        }
      },
      (error) => {
        this.showError(error)
      })
    }
    else{
      this.validateAllFormFields(this.searchForm)
    }
  }
  onCheckboxChange(e:any) {
    const addiotionalValue: FormControl = this.searchForm.get('addiotionalValue') as FormControl;
    const numStudents: FormControl = this.searchForm.get('numStudents') as FormControl;
    const toga: FormControl = this.searchForm.get('toga') as FormControl;

    if(numStudents.value){
      toga.setErrors(null)
      if (e.target.checked) {
        let val: number = AppSettings.ADDITIONALVALUE* parseInt(numStudents.value);
        addiotionalValue.patchValue(val);
      } else {
        addiotionalValue.patchValue(0);
      }
    }
    else{      
      toga.setErrors({'noStudents': true})
      setTimeout(() => {
        toga.patchValue(false)
      }, 2000);
    }
   
  }
  onNumStudentsChange(e:any){
    const toga: FormControl = this.searchForm.get('toga') as FormControl;
    toga.setErrors(null)
    toga.patchValue(false)
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  getDate(){
    const year: FormControl = this.searchForm.get('year') as FormControl;
    const month: FormControl = this.searchForm.get('month') as FormControl;
    const day: FormControl = this.searchForm.get('day') as FormControl;
    const hour: FormControl = this.searchForm.get('hour') as FormControl;

    return new Date(year.value, (month.value-1), day.value, hour.value, 0, 0)
  }
  showError(error:any){
    let message = '';

    if(error.error.Errors.AdditionalValue)
      message += error.error.Errors.AdditionalValue.join('\n');
    if(error.error.Errors.BaseValue)
      message += error.error.Errors.BaseValue.join('\n');      
    if(error.error.Errors.InstitutionAddress)
      message += error.error.Errors.InstitutionAddress.join('\n');
    if(error.error.Errors.InstitutionName)
      message += error.error.Errors.InstitutionName.join('\n');
    if(error.error.Errors.StartTime)
      message += error.error.Errors.StartTime.join('\n');
    if(error.error.Errors.NumStudents)
      message += error.error.Errors.NumStudents.join('\n');
    alert(message)
  }
        
}
