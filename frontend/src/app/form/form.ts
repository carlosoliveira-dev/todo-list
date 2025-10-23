import { Component, effect, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService, TaskModel, TaskWithIDModel } from '../task-service';
import { AsyncPipe } from '@angular/common';
import { Task } from '../task/task';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, AsyncPipe, Task],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
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
  