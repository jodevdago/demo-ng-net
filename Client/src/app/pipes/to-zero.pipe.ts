import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toZero',
  standalone: true
})
export class ToZeroPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if(value && value.trim() === '0.0%') return '0%';
    return value;
  }

}
