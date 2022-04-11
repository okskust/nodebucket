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
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  taskId: string;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    console.log('inside constructor' + this.empId);
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        this.tasks = res;
        console.log('inside constructor employee.tasks ' + this.tasks);
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService
          .createTask(this.empId, data.header, data.body, data.dateOfDeadline)
          .subscribe(
            (res) => {
              this.employee = res;
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.tasks = this.employee.tasks;
            }
          );
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const taskId = this.tasks[event.previousIndex]._id;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container);
      this.reorderTaskList(this.empId, this.tasks);
      //this.updateTaskList(this.empId, this.tasks, taskId);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      //console.log(this.tasks[event.currentIndex]);

      this.updateTaskList(this.empId, this.tasks, taskId);
      //this.reorderTaskList(this.empId, this.tasks);
    }
  }
  updateTaskList(empId: number, tasks: Task[], taskId: string): void {
    this.taskService.updateTask(empId, tasks, taskId).subscribe(
      (res) => {
        this.employee = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.tasks = this.employee.tasks;
      }
    );
  }

  reorderTaskList(empId: number, tasks: Task[]): void {
    this.taskService.reorderTask(empId, tasks).subscribe(
      (res) => {
        this.employee = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.tasks = this.employee.tasks;
      }
    );
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        console.log(taskId + ' was deleted');

        this.taskService.deleteTask(this.empId, taskId).subscribe(
          (res) => {
            this.employee = res;
            console.log(res);
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log(this.employee.tasks);
            this.tasks = this.employee.tasks;
          }
        );
      }
    }
  }
}
