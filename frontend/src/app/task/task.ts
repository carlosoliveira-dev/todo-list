import { Component, inject, input } from '@angular/core';
import { TaskService } from '../task-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  deleteTask$!: Observable<string>;

  private taskService = inject(TaskService);
  
  id = input<number>(0);
  description = input<string>("");
  done = input<boolean>(false);

  changeDone() {
    alert('done clicked.');
  }

  delete() {
    alert('delete clicked.');
    
    this.deleteTask$ = this.taskService.deleteTask(2);
      
    this.deleteTask$.subscribe({
      next: (res) => console.log('✅ Task excluída:', res),
      error: (err) => console.error('❌ Erro ao excluir:', err)
    });
  }
}