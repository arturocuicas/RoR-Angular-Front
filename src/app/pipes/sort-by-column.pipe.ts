import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByColumn'
})

export class SortByColumnPipe implements PipeTransform {

  transform(items: Array<any>, args?: any): any {
    return items.sort((a, b) => {
      if(a[args.property] < b[args.property]){
        return -1 * args.direction;
      }

      else if( a[args.property] > b[args.property]){
        return 1 * args.direction;
      }

      else{
        return 0;
      }

    });
  }
}
