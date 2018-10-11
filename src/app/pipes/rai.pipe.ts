import { Pipe, PipeTransform } from '@angular/core';
import {AppSettingsService} from "../services/app-settings.service";

@Pipe({
  name: 'rai'
})
export class RaiPipe implements PipeTransform {
  precision = 2;

  nos = 10000000000; // 1 nos = 10000000000 raw

  transform(value: any, args?: any): any {
    const opts = args.split(',');
    let denomination = opts[0] || 'nos';
    const hideText = opts[1] || false;

    switch (denomination.toLowerCase()) {
      default:  
      case 'nos': return `${(value / this.nos).toFixed(this.precision)}${!hideText ? 'NOS': ''}`;
    }
  }
  
  toFixed(num, fixed) { //deprecated
    if (isNaN(num)) return 0;
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

}
