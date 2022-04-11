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
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(
    empId: number,
    header: string,
    body: string,
    dateOfDeadline: string
  ): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      header: header,
      body: body,
      status: 'todo',
      dateOfCreation: new Date(),
      dateOfDeadline: dateOfDeadline,
      dateOfCompletion: null,
    });
  }
  updateTask(empId: number, tasks: Task[], taskId: string): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks/' + taskId, {
      tasks,
    });
  }
  reorderTask(empId: number, tasks: Task[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      tasks,
    });
  }


  deleteTask(empId: number, taskId: string): Observable<any> {
    const result=this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
    console.log(result);
    return result;
  }


}
