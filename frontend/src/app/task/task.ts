import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  id = input<number>(0);
  description = input<string>("");
  done = input<boolean>(false);

  changeDone() {
    alert('done clickado.');
  }
}