import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {DateMaterialModule} from './material-module';
import {MatSliderModule} from '@angular/material/slider';
import { Title } from  '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FilterPipe } from './pipe/filter.pipe';
import { DataService } from './service/data.service';

const pathMappings : Routes = [
  {path:'', component: ViewTaskComponent },
  { path: 'addTask', component: TaskFormComponent },
  { path: 'saveTask', component: AddTaskComponent },
  { path: 'viewTasks', component: ViewTaskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    HeaderComponent,
    FooterComponent,
    TaskFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(pathMappings),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DateMaterialModule,
    MatSliderModule,
    HttpClientModule
  ],
  entryComponents: [TaskFormComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
