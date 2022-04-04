export interface Task {
  _id: string;
  header: string;
  body: string;
  status: string;
  dateOfCreation: Date;
  dateOfDeadline: Date;
  dateOfCompletion: Date;
}
