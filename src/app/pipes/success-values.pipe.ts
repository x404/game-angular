import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'successvalue',  pure: false })
export class SuccessValuesPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value.success
    }
}