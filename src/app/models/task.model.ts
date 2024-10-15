export interface Task {
  id: number;
  title: string;
  completed: boolean; // Boolean type
  priority: string; // Ensure this is a string
  dueDate: Date; // Ensure this is a Date type
}