import { Component, inject, input } from '@angular/core';
import { TaskModel, TaskService } from '../task-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  deleteTask$!: Observable<string>;
  changeDone$!: Observable<TaskModel>

  private taskService = inject(TaskService);
  
  id = input<number>(0);
  description = input<string>("");
  done = input<boolean>(false);

  changeDone() {
    const t: TaskModel = {
          description: this.description(),
          done: !this.done()
        };


    this.changeDone$ = this.taskService.changeDone(this.id(), t);
    
    this.changeDone$.subscribe({
      next: (res) => console.log('✅ Done da task modificada:', res),
      error: (err) => console.error('❌ Erro ao modificar Done:', err)
    });
  }

  delete() {    
    this.deleteTask$ = this.taskService.deleteTask(this.id());
      
    this.deleteTask$.subscribe({
      next: (res) => console.log('✅ Task excluída:', res),
      error: (err) => console.error('❌ Erro ao excluir:', err)
    });
  }
}