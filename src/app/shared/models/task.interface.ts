/**
 * Title: task.interface.ts
 * Author: Oksana Kustova
 * Date: 02/02/2022
 * Description: Task interface object
 */

export interface Task {
  _id: string;
  header: string;
  body: string;
  status: string;
  dateOfCreation: Date;
  dateOfDeadline: Date;
  dateOfCompletion: Date;
}
