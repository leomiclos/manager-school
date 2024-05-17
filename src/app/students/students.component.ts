import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../model/student';
import { CommonModule } from '@angular/common';
import { AlterComponent } from '../modal/alter/alter.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InsertComponent } from '../modal/insert/insert.component';
import { School } from '../model/school';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolService } from '../school/school.service';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, AlterComponent, HeaderComponent, ReactiveFormsModule, FormsModule],
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
  searchTerm: any;

  constructor(private studentsService: StudentsService,
    private schoolService: SchoolService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getAllStudents();
    this.getAllSchools();
  }


  getAllSchools() {
    this.schoolService.getAllSchools().subscribe((response: any) => {
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
    this.modalRef = this.modalService.show(AlterComponent, { initialState })
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

  filterStudents(term: any) {
    console.log(term);

    if (!term) {
      this.getAllStudents()
    } else {
      term = term.toLowerCase();
      this.alunos = this.alunos.filter((aluno: any) =>
        aluno.sNome.toLowerCase().includes(term) || aluno.sCPF.includes(term)
      );
    }
  }


}
