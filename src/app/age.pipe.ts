import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-precise-range-plugin';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    if (!value) {
      return 'No se ha definido una fecha';
    }
    const today = moment();
    const birthday = moment(value);
    // tslint:disable-next-line
    const diff = moment.preciseDiff(today, birthday, true);
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
    return age;
  }

}
