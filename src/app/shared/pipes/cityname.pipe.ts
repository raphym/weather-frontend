import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'Pipename' })

export class CapitalizeFirstPipe implements PipeTransform {
    transform(value: string, args: any[]): string {
        let words = value.split(' ');
        words = words.map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
        let newVal = '';
        words.forEach(w => newVal += w + ' ');
        return newVal;
    }
}
