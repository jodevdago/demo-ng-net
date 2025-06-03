import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level',
  standalone: true
})
export class LevelPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Level1':
        return 'Level 1';
      case 'Level2':
        return 'Level 2';
      case 'Level3':
        return 'Level 3';
      default:
        return value;
    }
  }

}
