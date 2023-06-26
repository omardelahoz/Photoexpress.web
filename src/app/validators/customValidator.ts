import { AbstractControl } from "@angular/forms";

export function dayValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {

    let year: number = returnNumber(control.get('year')?.value)
    let month: number = returnNumber(control.get('month')?.value)
    let day: number = returnNumber(control.get('day')?.value)
    
    if(year == 0 || month == 0 || day == 0){
        return null
    }

    month = month -1

    let validDate =   month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year);

    if (!validDate) {
      return { dayInvaid: true };
    }

    return null;

  }

export function returnNumber(value:any){
    if(value == undefined || value == null || value == ''){
        return 0
    }

    return parseInt(value)
}
export function daysInMonth(m:number, y:number) { // m is 0 indexed: 0-11
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
}