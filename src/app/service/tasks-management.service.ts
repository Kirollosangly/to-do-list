import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksManagementService {
  _baseURL: string = "http://localhost:3000/tasks";

  constructor(private _HttpClient: HttpClient) { };

  getAllTasks(): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}`);
  }

  getSpecificTask(id: string): Observable<any> {
    return this._HttpClient.get(`${this._baseURL}/${id}`);
  }

  addTask(addTask: Task): Observable<any> {
    return this._HttpClient.post(`${this._baseURL}`, addTask);
  }

  updateTask(id: string, editTask: Task): Observable<any> {
    return this._HttpClient.put(`${this._baseURL}/${id}`, editTask);
  }

  removeTask(id: string): Observable<any> {
    return this._HttpClient.delete(`${this._baseURL}/${id}`);
  }

  

}
