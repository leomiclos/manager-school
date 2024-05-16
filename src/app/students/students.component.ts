import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../model/student';
import { CommonModule } from '@angular/common';
import { AlterComponent } from '../modal/alter/alter.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { InsertComponent } from '../modal/insert/insert.component';
import { HttpClient } from '@angular/common/http';
import { School } from '../model/school';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, AlterComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [BsModalService],

})
export class StudentsComponent implements OnInit {
  selectedStudent: Student | null = null
  alunos: Student[] = [];
  aluno: Student = {
    dNascimento: '',
    iCodAluno: 0,
    iCodEscola: 0,
    sCPF: '',
    sCelular: '',
    sEndereco: '',
    sNome: ''
  };

  schools: School[] = [];


  notHaveAlert: boolean = true;

  modalRef?: BsModalRef
  constructor(private studentsService: StudentsService,
    private modalService: BsModalService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllStudents();
    this.getAllSchools();
  }


  getAllSchools() {
    this.http.get('http://localhost:5043/escola').subscribe((response: any) => {
      this.schools = response;
    });
  }

  getSchoolName(iCodEscola: number): string {
    const escola = this.schools.find(e => e.iCodEscola === iCodEscola);
    return escola ? escola.sDescricao : 'Escola não encontrada';
  }

  formatarData(dataStr: string): string {
    const data = new Date(dataStr);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  openAlterModal(aluno: Student) {
    this.selectedStudent = aluno

    const initialState = {
      aluno: this.selectedStudent
    }
    this.modalRef = this.modalService.show(AlterComponent, {initialState})
  }

  openInsertModal() {

    this.modalRef = this.modalService.show(InsertComponent)
  }

  getAllStudents() {
    this.studentsService.getAllStudents().subscribe(data => {
      this.alunos = data;


      if (this.alunos.length > 0) {
        this.aluno = this.alunos[0];
        this.formatarData(this.aluno.dNascimento)
        this.notHaveAlert = false;
      } else {
        this.notHaveAlert = true;
      }
    });
  }
}
