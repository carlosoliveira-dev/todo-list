import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Form } from './form/form';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Form, Task],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-frontend');
}
