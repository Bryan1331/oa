import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../model/classroom';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private url: string = `${environment.HOST}/classrooms`;
  private classroomChange: Subject<Classroom[]> = new Subject<Classroom[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Classroom[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<Classroom>(`${this.url}/${id}`);
  }

  save(classroom: Classroom) {
    return this.http.post(this.url, classroom);
  }

  update(id: number, classroom: Classroom) {
    return this.http.put(`${this.url}/${id}`, classroom);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setClassroomChange(data: Classroom[]) {
    this.classroomChange.next(data);
  }

  getClassroomChange() {
    return this.classroomChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}