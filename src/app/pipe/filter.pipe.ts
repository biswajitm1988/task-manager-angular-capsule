import { Pipe, PipeTransform, Injector, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable({
  providedIn: 'root'
})
export class FilterPipe implements PipeTransform {
  transform(tasks: any[], propertyName?: string, searchText?: string): any[] {
    console.log("searchText >>" + searchText);
    console.log("propertyName >>" + propertyName);
    if (!tasks) return [];
    if (!searchText) return tasks;
    return tasks.filter(task => {
      console.log("here")
      switch (propertyName) {
        case 'priorityGt':
          return task.priority > searchText
        case 'priorityLt':
          return task.priority < searchText
        case 'startDateInput':
          return task.startDate > new Date(searchText)
        case 'endDateInput':
          return task.endDate < new Date(searchText)
        default:
          return task[propertyName].toLowerCase().indexOf(searchText.toLowerCase()) > -1
      }
    }
    );
  }
}
