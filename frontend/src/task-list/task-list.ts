import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, Input, WritableSignal } from '@angular/core';
import { Task } from '../app/task/task';
import { TaskModel, TaskService, TaskWithIDModel } from '../app/task-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, Task],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  @Input() newTask!: WritableSignal<string>;

  task$!: Observable<TaskModel>;
  tasks$!: Observable<TaskWithIDModel[]>;

  private taskService = inject(TaskService);

  constructor() {
    effect(() => {
      this.loadTasks();

      if (this.newTask().trim() !== ''){
        const t: TaskModel = {
          description: this.newTask(),
          done: false
        };

        this.AddTask(t);
      }
    });
  }
  
  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  AddTask(t: TaskModel) {
      
    this.task$ = this.taskService.addTask(t);
      
    this.task$.subscribe({
      next: (res) => console.log('✅ Task adicionada:', res),
      error: (err) => console.error('❌ Erro ao adicionar:', err)
    });
    this.loadTasks();
  }

}

