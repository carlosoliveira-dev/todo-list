import { Component, effect, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService, TaskModel } from '../task-service';
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

  tasks$!: Observable<TaskModel[]>;
  task$!: Observable<TaskModel>;

  private taskService = inject(TaskService);

  constructor() {
    effect(() => {
      this.tasks$ = this.taskService.getTasks();
      
    });
    
  //   this.task$ = this.taskService.addTask(this.t);

  //   this.task$.subscribe({
  //     next: (res) => console.log('✅ Task adicionada:', res),
  //     error: (err) => console.error('❌ Erro ao adicionar:', err)
  //   });
  }
}
