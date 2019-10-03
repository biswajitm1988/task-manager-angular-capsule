import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  task: Task;
  tasks: Task[];

  sendData(task: Task) {
    this.log.info("[DataService.sendData] Data received >> ", task);
    this.task = task;
  }

  getData(): Task {
    return this.task;
  }

  constructor(private log:LogService, private http: HttpClient) {
    this.tasks = [{ taskSummary: "task 1", parentTask: { parentTaskSummary: "parentTask 1" }, priority: 10, startDate: new Date("9/3/19"), endDate: new Date("9/30/19") },
    { taskSummary: "task 1", parentTask: { parentTaskSummary: "parentTask 1" }, priority: 10, startDate: new Date("9/3/19"), endDate: new Date("9/30/19") },
    { taskSummary: "task 2", parentTask: { parentTaskSummary: "parentTask 1" }, priority: 20, startDate: new Date("9/13/19"), endDate: new Date("9/23/19") },
    { taskSummary: "task 3", parentTask: { parentTaskSummary: "parentTask 3" }, priority: 15, startDate: new Date("9/11/19"), endDate: new Date("9/28/19") },
    { taskSummary: "task 4", parentTask: { parentTaskSummary: "parentTask 2" }, priority: 5, startDate: new Date("9/18/19"), endDate: new Date("9/22/19") }]
  }
  getAllTasks(): Task[] {
    return this.tasks;
  }
}
