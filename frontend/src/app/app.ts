import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import {AsyncPipe} from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskModel, TaskService, TaskWithIDModel } from './task-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  myForm = new FormControl('');
  newTask: WritableSignal<string> = signal('')

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
  
  clearForm() {
    this.myForm.setValue('');
  }

  onEnter() {
    
    let myFormValue = this.myForm.value;
        
    if (myFormValue != null) {
      this.newTask.set(myFormValue);
    }

    this.clearForm();
  }

  OnButton() {
    this.clearForm();
  }

}
