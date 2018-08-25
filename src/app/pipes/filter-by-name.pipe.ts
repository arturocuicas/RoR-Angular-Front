import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})

export class FilterByNamePipe implements PipeTransform {

  constructor() {}

  transform(items: Array<any>, name: string): Array<any> {

    if(name == null) return items;

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });

  }
}
