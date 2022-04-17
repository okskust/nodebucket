/**
 * Title: employee.interface.ts
 * Author: Oksana Kustova
 * Date: 02/02/2022
 * Description: Employee interface object
 */
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
