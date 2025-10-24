import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {AsyncPipe} from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskModel, TaskService, TaskWithID } from './task-service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  myForm = new FormControl('');

  private taskService = inject(TaskService);

  addTask$!: Observable<TaskModel>;
  getTasks$!: Observable<TaskWithID[]>;
  
  deleteTask$!: Observable<string>;
  changeDone$!: Observable<TaskModel>

  tasks: WritableSignal<TaskWithID[]> = signal([]);

  loadTasks() {
    this.getTasks$ = this.taskService.getTasks();
    this.getTasks$.subscribe({
      next: (tasksRes) => {
        console.log('✅ Lista de tasks carregada:', tasksRes);
        this.tasks.set(tasksRes);
      },
      error: (err) => console.error('❌ Erro carregar lista de tasks:', err)
    });
  }

  onEnter() {
    let myFormValue = this.myForm.value;
        
    if (myFormValue != null) {
      const t: TaskModel = {
        description: myFormValue,
        done: false 
      };
      this.AddTask(t);
      this.loadTasks();
    }
    this.clearForm();
    
  }
  
  OnButton() {
    this.clearForm();
  }

  clearForm() {
    this.myForm.setValue('');
  }
  
  AddTask(t: TaskModel) {
    this.addTask$ = this.taskService.addTask(t);
      
    this.addTask$.subscribe({
      next: (res) => console.log('✅ Task adicionada:', res),
      error: (err) => console.error('❌ Erro ao adicionar:', err)
    });
  }

  delete(task: TaskWithID) {    
    this.deleteTask$ = this.taskService.deleteTask(task.id);
      
    this.deleteTask$.subscribe({
      next: (res) => console.log('✅ Task excluída:', res),
      error: (err) => console.error('❌ Erro ao excluir:', err)
    });
  }

  done(task: TaskWithID) {
    const t: TaskModel = {
            description: task.description,
            done: !task.done
      };

    this.changeDone$ = this.taskService.changeDone(task.id, t);
    
    this.changeDone$.subscribe({
      next: (res) => console.log('✅ Done da task modificada:', res),
      error: (err) => console.error('❌ Erro ao modificar Done:', err)
    });
  }
}
