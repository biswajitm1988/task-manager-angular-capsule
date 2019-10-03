import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { DataService } from '../service/data.service';
import { TaskManagerService } from '../service/task-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentTask } from '../model/parent-task';
import { LogService } from '../service/log.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isNew: boolean;
  task: Task;
  errMsg: string;
  minStartDate: Date = new Date;

  constructor(private log: LogService, private dataService: DataService, private taskManagerService: TaskManagerService, private router: Router, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id != "" && id != null) {
      this.log.info("[TaskFormComponent.ngOnInit] Id >> ", id);
      this.taskManagerService.getTaskByIdFromService(id).subscribe(task=>{
        this.task =task;
        this.log.info("[TaskFormComponent.ngOnInit] Data fetched >> ", this.task);
      });
      }
    this.initializeTask(false);
  }

  initializeTask(isNew:boolean) {
    if (isNew || this.task == null) {
      this.task = new Task;
      this.task.parentTask = new ParentTask;
      this.isNew = true;
    }
  }

  saveTask() {
    this.log.info("[TaskFormComponent.saveTask] Save >> ", this.task, this.isNew);
    if (this.isNew) {
      this.taskManagerService.addTask(this.task).subscribe((tasks) => {
        this.router.navigate(['/viewTasks']);
      });
    } else {
      this.taskManagerService.editTask(this.task).subscribe((tasks) => {
        this.router.navigate(['/viewTasks']);
      });
    }
  }
}