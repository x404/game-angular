import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'errorvalue',  pure: false })
export class ErrorValuesPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value.error
    }
}