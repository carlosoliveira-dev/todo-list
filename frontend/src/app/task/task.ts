import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  id = input<number>(15);
  description = input<string>('Programar');
  done = input<boolean>(false);
}