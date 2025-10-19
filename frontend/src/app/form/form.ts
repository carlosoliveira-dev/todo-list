import { Component, effect, inject } from '@angular/core';
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
  name = new FormControl('');

  tasks$!: Observable<Task[]>;
  
  private taskService = inject(TaskService);

  constructor() {
    effect(() => {
      this.tasks$ = this.taskService.getTasks();
    });
  }
}
