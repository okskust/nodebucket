/**
 * Title:tasks.components.ts
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
  todo: Task[];
  done: Task[];

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
        console.log(res);
        console.log('inside constructor employee.tasks ' + this.tasks);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.tasks.filter((item) => item.status === 'todo');
        this.done = this.tasks.filter((item) => item.status === 'done');
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
              console.log('inside createTask component ' + res);
              this.employee = res;
            },
            (err) => {
              console.log(err);
            },
            () => {
              //this.tasks = this.employee.tasks;
              this.todo = this.employee.tasks.filter(
                (item) => item.status === 'todo'
              );
              this.done = this.employee.tasks.filter(
                (item) => item.status === 'done'
              );
            }
          );
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('inside drop' + this.tasks);
      this.moveTaskList(this.empId, this.todo, this.done);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.previousContainer);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      //console.log(this.tasks[event.currentIndex]);

      if (event.container.data[event.currentIndex].status === 'todo') {
        this.done[event.currentIndex].status = 'done';
        this.done[event.currentIndex].dateOfCompletion = new Date();
      } else {
        this.todo[event.currentIndex].status = 'todo';
        this.todo[event.currentIndex].dateOfCompletion = null;
      }


      //const taskId = event.container.data[event.currentIndex]._id;

      this.moveTaskList(this.empId, this.todo, this.done);
      //this.reorderTaskList(this.empId, this.tasks);
    }
  }
  moveTaskList(empId: number, todo: Task[], done: Task[]): void {
    this.taskService.moveTask(empId, todo, done).subscribe(
      (res) => {
        this.employee = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log(this.employee);
        //this.tasks = this.employee.tasks;
        this.todo = this.employee.tasks.filter(
          (item) => item.status === 'todo'
        );
        this.done = this.employee.tasks.filter(
          (item) => item.status === 'done'
        );
      }
    );
  }

  updateTaskList(
    empId: number,
    todo: Task[],
    done: Task[],
    taskId: string
  ): void {
    this.taskService.updateTask(empId, todo, done, taskId).subscribe(
      (res) => {
        this.employee = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        //this.tasks = this.employee.tasks;
        this.todo = this.employee.tasks.filter(
          (item) => item.status === 'todo'
        );
        this.done = this.employee.tasks.filter(
          (item) => item.status === 'done'
        );
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
            //this.tasks = this.employee.tasks;
            this.todo = this.employee.tasks.filter(
              (item) => item.status === 'todo'
            );
            this.done = this.employee.tasks.filter(
              (item) => item.status === 'done'
            );
          }
        );
      }
    }
  }
}
