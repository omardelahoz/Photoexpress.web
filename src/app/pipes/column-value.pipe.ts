import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../models/tableColum';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-Co';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {

  transform(row: any, column: TableColumn): unknown {
    registerLocaleData(localeEsCO, 'es-CO')
    let displayValue = row[column.dataKey];

    switch (column.dataType) {
      case 'date':
        if (column.formatt !== undefined) {
          displayValue = new DatePipe('es-CO').transform(
            displayValue,
            column.formatt
          );
        }
        break;
      case 'object':
        const arrayKeys = column.dataKey.split('.');
        let currentValue: any;

        arrayKeys.forEach((key) => {
          if (currentValue === undefined) {
            currentValue = row[key];
            return;
          }
          currentValue = currentValue[key];
        });

        displayValue = currentValue;
        break;

      case 'number':
        
        displayValue = new DecimalPipe('es-CO').transform(displayValue)
        break;

      default:
        break;
    }

    return displayValue;

  }

}
