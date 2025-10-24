import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {AsyncPipe} from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
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

  async loadTasks() {
    try {
      const tasksRes = await firstValueFrom(this.taskService.getTasks());
      this.tasks.set(tasksRes);
      console.log('✅ Lista de tasks carregada:', tasksRes);
    } catch (err) {
      console.error('❌ Erro carregar lista de tasks:', err)
    }
  }

  async onEnter() {
    let myFormValue = this.myForm.value;
        
    if (myFormValue != null) {
      const t: TaskModel = {
        description: myFormValue,
        done: false 
      };
      await this.AddTask(t);
    }
    this.clearForm(); 
  }
  
  async OnButton() {
    this.clearForm();
  }

  async clearForm() {
    this.myForm.setValue('');
  }
  
  async AddTask(t: TaskModel) {
    try {
      const res = await firstValueFrom(this.taskService.addTask(t));
      console.log('✅ Task adicionada:', res)
    } catch (err) {
      console.error('❌ Erro ao adicionar:', err)
    }
    await this.loadTasks();
  }

  async delete(task: TaskWithID) {
    try {
      const res = await firstValueFrom(this.taskService.deleteTask(task.id));
      console.log('✅ Task excluída:', res)
    } catch (err) {
      console.error('❌ Erro ao excluir:', err)
    }   
    await this.loadTasks();
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
