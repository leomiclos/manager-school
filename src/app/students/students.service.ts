import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private http: HttpClient,

  ) { }


  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:5043/alunos');
  }

  insertStudent(formData: any){
    return this.http.post('http://localhost:5043/alunos', formData)
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`http://localhost:5043/alunos/${student.iCodAluno}`, student);
  }

}
