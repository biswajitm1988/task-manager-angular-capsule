import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isNew: boolean;
  task: Task;
  errMsg: string;
  constructor(private dataService: DataService) {

   }

  ngOnInit() {
    this.task = this.dataService.getData();
    console.log("Data fetched"+this.task)
    if(this.task==null){
      this.task = new Task;
      this.isNew = true;
    }
  }

  saveTask(){
    this.dataService.addTask(this.task);
  }

}
