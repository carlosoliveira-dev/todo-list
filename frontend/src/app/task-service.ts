import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'api/tasks';
  private http = inject(HttpClient);
  
  addTask(t: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, t);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
}
