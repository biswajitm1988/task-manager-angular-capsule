import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { FilterPipe } from '../pipe/filter.pipe';
import { Router } from '@angular/router';
import { TaskManagerService } from '../service/task-manager.service';
import { LogService } from '../service/log.service';
import { ParentTask } from '../model/parent-task';
import * as moment from 'moment';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  providers: [FilterPipe]
})
export class ViewTaskComponent implements OnInit {

  task: Task;
  errMsg: string;
  tasks: Task[];
  today: Date = new Date();
  constructor(private log: LogService, private taskManagerService: TaskManagerService, private router: Router) {
    this.log.info("[ViewTaskComponent.constructor] today", this.today);
    this.taskManagerService.getAllTasksFromService().subscribe((tasks) => {
      this.tasks = tasks;
      this.log.info("[ViewTaskComponent.constructor] View On Init. Tasks", this.tasks);
    });
  }

  ngOnInit() {
    this.task = new Task;
    this.task.parentTask = new ParentTask;
  }

  editTask(task: Task) {
    this.log.info("[ViewTaskComponent.editTask] Sending Data " + task);
    this.router.navigate(['/addTask',task.taskId]);
  }

  endTask(task: Task) {
    this.log.info("[ViewTaskComponent.endTask] Sending Data ", task);
    this.taskManagerService.editTask(task).subscribe((tasks) => {
      this.tasks = tasks;
      this.router.navigate(['/viewTasks']);
    });
  }

  isTaskEditable(task): boolean {
    if(moment(task.startDate).isBefore(this.today, 'day') && (task.endDate != 'undefined' && task.endDate != null && moment(task.endDate).isSameOrBefore(this.today, 'day'))) {
      return false;
    }else if (moment(task.startDate).isSameOrAfter(this.today, 'day') || (task.endDate == null || moment(task.endDate).isAfter(this.today, 'day'))) {
      return true;
    }
    return false;
  }
  isTaskEligibleToEnd(task): boolean {
    if (moment(task.startDate).isBefore(this.today, 'day') && (task.endDate != 'undefined' && task.endDate != null && moment(task.endDate).isSameOrBefore(this.today, 'day'))) {
      return false;
    }else if(moment(task.startDate).isAfter(this.today, 'day') && (task.endDate == null || moment(task.endDate).isAfter(this.today, 'day'))){
      return false;
    }
    return true;
  }
}
