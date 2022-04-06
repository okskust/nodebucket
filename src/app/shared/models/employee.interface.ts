import { Task } from './task.interface';

export interface Employee {
  _id:  string;
  empId: string;
  firstName: string;
  lastName:  string;
  password:  string;
  email:  string;
  tasks: Task[];
}
