/**
 * Title: task.service.ts
 * Author: Oksana Kustova
 * Date: 2/5/2022
 * Description: Task service.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  findAllTasks(empId: number): Observable<any> {
    console.log('iam here findAllTasks');
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(
    empId: number,
    header: string,
    body: string,
    dateOfDeadline: string
  ): Observable<any> {
    const result = this.http.post('/api/employees/' + empId + '/tasks', {
      header: header,
      body: body,
      status: 'todo',
      dateOfCreation: new Date(),
      dateOfDeadline: dateOfDeadline,
      dateOfCompletion: null,
    });
    console.log("inside createTask " + result);
    return result;
  }

  moveTask(empId: number, todo: Task[], done: Task[]): Observable<any> {
    const tasks = todo.concat(done);
    console.log(tasks);
    return this.http.put('/api/employees/' + empId + '/tasks', {
      tasks,
    });
  }

  updateTask(empId: number, todo: Task[], done: Task[], taskId: string): Observable<any> {
    const tasks = todo.concat(done);
    console.log(tasks);
    return this.http.put('/api/employees/' + empId + '/tasks/' + taskId, {
      tasks,
    });
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    const result = this.http.delete(
      '/api/employees/' + empId + '/tasks/' + taskId
    );
    console.log(result);
    return result;
  }
}
