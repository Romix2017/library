import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../settings/settings';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (value == "0001-01-01T00:00:00") {
      return "Not yet";
    } 
    return super.transform(value, Constants.DATE_FMT);
  }
}
