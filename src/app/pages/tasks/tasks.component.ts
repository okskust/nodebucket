/**
 * Title:home.components.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
 * Description: component.
 */

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Task } from 'src/app/shared/models/task.interface';
import { TaskService } from 'src/app/shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  employee: Employee;
  tasks: Task[];
  empId: number;
  name: string;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    console.log("inside constructor"+this.empId);
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        this.tasks = res;
          console.log("inside constructor employee.tasks "+this.tasks);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.taskService.createTask(this.empId, data.header, data.body, data.dateOfDeadline).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log(err);
        }, () => {
          this.tasks = this.employee.tasks;
        })
      }
    })
  }
}
