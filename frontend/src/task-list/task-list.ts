import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../app/task/task';
import { TaskModel, TaskService, TaskWithIDModel } from '../app/task-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [ReactiveFormsModule, AsyncPipe, Task],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  name = new FormControl('');

  task$!: Observable<TaskModel>;
  tasks$!: Observable<TaskWithIDModel[]>;

  private taskService = inject(TaskService);

  constructor() {
    effect(() => {
      this.loadTasks();
    });
  }
  
  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  AddTask() {
    
    if (this.name.value != null && this.name.value.trim() !== '') {
      const t: TaskModel = {
        description: this.name.value,
        done: false
      }
        
      this.task$ = this.taskService.addTask(t);
        
      this.task$.subscribe({
        next: (res) => console.log('✅ Task adicionada:', res),
        error: (err) => console.error('❌ Erro ao adicionar:', err)
      });
      this.loadTasks();
    }
  }

  onEnter() {
    this.AddTask();
  }
}
