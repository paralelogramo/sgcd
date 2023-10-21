import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertable'
})
export class FiltertablePipe implements PipeTransform {
  transform(items: any[], filterText: string): any[] {
    if (!items || !filterText) {
      return items;
    }

    console.log(filterText)

    filterText = filterText.toLowerCase();
    return items.filter(item => {
      item.uni_id.toLowerCase().includes(filterText) ||
        item.name.toLowerCase().includes(filterText) ||
        item.year.toLowerCase().includes(filterText) ||
        item.email.toLowerCase().includes(filterText) ||
        item.state.toLowerCase().includes(filterText) ||
        item.advisor.toLowerCase().includes(filterText) ||
        item.coadvirsor.toLowerCase().includes(filterText)
    });
  }

}
