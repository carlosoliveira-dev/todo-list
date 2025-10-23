import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Form } from './form/form';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Form, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-frontend');
}
