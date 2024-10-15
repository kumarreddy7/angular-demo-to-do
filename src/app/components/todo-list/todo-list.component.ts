import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('taskAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class TodoListComponent {
  newTaskTitle: string = '';
  newTaskPriority: string = 'Low'; // Should remain a string
  newTaskDueDate: Date | null = null;
  
  tasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';
  warningMessage: string = ''; // Property for warning message

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    // Check if the selected date is in the past
    if (this.newTaskDueDate && this.newTaskDueDate <= new Date()) {
      this.warningMessage = 'Please select a due date that is today or in the future.';
      return; // Stop the task addition
    }

    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false,
        priority: this.newTaskPriority,
        dueDate: this.newTaskDueDate || new Date(),
      };
      this.tasks.push(newTask);
      this.resetForm();
      this.warningMessage = ''; // Clear warning message
    }
  }


  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
  }

  toggleCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
    this.tasks = this.taskService.getTasks();
  }

  filteredTasks(): Task[] {
    switch (this.filter) {
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  resetForm() {
    this.newTaskTitle = '';
    this.newTaskPriority = 'Low'; // Reset priority to string
    this.newTaskDueDate = null; // Reset date to null
  }
}