import { Pipe, PipeTransform } from '@angular/core';
import {AppSettingsService} from "../services/app-settings.service";

@Pipe({
  name: 'rai'
})
export class RaiPipe implements PipeTransform {
  precision = 2;

  nollar = 100; // 1 USD = 100 cents

  transform(value: any, args?: any): any {
    const opts = args.split(',');
    let denomination = opts[0] || 'nollar';
    const hideText = opts[1] || false;

    switch (denomination.toLowerCase()) {
      default:  
      case 'nollar': return `${(value / this.nollar).toFixed(this.precision)}${!hideText ? ' USD': ''}`;
    }
  }
  
  toFixed(num, fixed) { //deprecated
    if (isNaN(num)) return 0;
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

}
