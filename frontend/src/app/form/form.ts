import { Component, effect, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService, Task } from '../task-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private t: Task = { 
    id: 0,
    title: 'serviço addtask',
    description: 'show de bola...' 
  };
  name = new FormControl('');

  tasks$!: Observable<Task[]>;
  task$!: Observable<Task>;

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
