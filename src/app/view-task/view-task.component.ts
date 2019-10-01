import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { FilterPipe } from '../pipe/filter.pipe';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  providers:[FilterPipe]
})
export class ViewTaskComponent implements OnInit {
  
  task: Task;
  errMsg: string;
  tasks: Task[];
  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.tasks = this.dataService.getAllTasks();
    this.task= new Task;
  }

  editTask(task:Task){
    console.log("Sending Data "+task);
    this.dataService.sendData(task);
    this.router.navigate(['/addTask']);
  }

}
