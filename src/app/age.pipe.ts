import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-precise-range-plugin';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    if (!value) {
      return 'Sin fecha de nacimiento';
    }
    const today = moment();
    const birthdate = moment(value);
    const diff = (moment as any).preciseDiff(today, birthdate, true);
    let age = '';
    if (diff.years) {
      age = age + diff.years + ' años ';
    }
    if (diff.months) {
      age = age + diff.months + ' meses ';
    }
    if (diff.days) {
      age = age + diff.days + ' días';
    }
    if (age.length === 0) {
      age = 'Recién nacido';
    }
    return age;
  }

}
