export interface Task {
  id: string;
  completed: boolean;
  name: string;
  dueDate?: string;
  tag?: string;
  note?: string;
}
