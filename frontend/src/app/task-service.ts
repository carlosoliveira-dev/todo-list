import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TaskModel {
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
  
  addTask(t: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.apiUrl, t);
  }

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }
}
