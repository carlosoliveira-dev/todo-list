import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TaskModel {
  description: string,
  done: boolean
}

export interface TaskWithIDModel {
  id: number,
  description: string,
  done: boolean
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

  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + "/" + id);
  }

  getTasks(): Observable<TaskWithIDModel[]> {
    return this.http.get<TaskWithIDModel[]>(this.apiUrl);
  }

  changeDone(id: number, t: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.apiUrl + "/" + id, t);
  }
}
