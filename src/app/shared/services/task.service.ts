import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTasks(
    empId: number,
    header: string,
    body: string,
    status: string,
    dateOfCreation: Date,
    dateOfDeadline: Date,
    dateOfCompletion: Date
  ): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      header: header,
      body: body,
      status: status,
      dateOfCreation: dateOfCreation,
      dateOfDeadline: dateOfDeadline,
      dateOfCompletion: dateOfCompletion,
    });
  }
}
