import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from '../model/school';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getAllSchools(){
    return this.http.get<School[]>('http://localhost:5043/escola');
  }

  insertSchool(form: any){
    return this.http.post('http://localhost:5043/escola', form);
  }

  updateSchool(form: any, id: School){
    return this.http.put(`http://localhost:5043/escola/${id.iCodEscola}`, form);
  }
}
