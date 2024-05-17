import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from '../../students/students.service';
import { Student } from '../../model/student';
import Swal from 'sweetalert2';
import { SchoolService } from '../../school/school.service';
import { School } from '../../model/school';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alter.component.html',
  styleUrl: './alter.component.css',
})
export class AlterComponent implements OnInit {

  @Input() aluno!: Student;

  schools: School[] = []

  form!: FormGroup;

  constructor(private studentsService: StudentsService, private schoolService: SchoolService) { }

  ngOnInit() {
    this.getAllSchools()


    if (this.aluno) {
      this.form = new FormGroup({
        nome: new FormControl(this.aluno.sNome, Validators.required),
        endereco: new FormControl(this.aluno.sEndereco, Validators.required),
        celular: new FormControl(this.aluno.sCelular, Validators.required),
        iCodEscola: new FormControl(this.aluno.iCodEscola, Validators.required),

      });
    }


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


  attStudent() {
    const id = this.aluno.iCodAluno

    if (this.form.valid) {
      const updatedStudent: any = {
        sNome: this.form.get('nome')?.value,
        sEndereco: this.form.get('endereco')?.value,
        sCelular: this.form.get('celular')?.value,
        iCodEscola: this.form.get('iCodEscola')?.value,
      };

      this.studentsService.updateStudent(updatedStudent, id).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Dados atualizados com sucesso',
          }).then(res => {
            if(res.isConfirmed){
              window.location.reload()
            }
          })
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao atualizar o estudante',
          });
          console.error('Erro ao atualizar o estudante', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Informação',
        text: 'Formulário inválido',
      });
    }
  }

  delete() {
    const id = this.aluno.iCodAluno;

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudent(id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'O registro foi deletado.',
              'success'
            ).then(res => {
              if(res.isConfirmed){
                window.location.reload()
              }
            })
          },
          (error) => {
            Swal.fire(
              'Erro!',
              'Houve um erro ao deletar o registro.',
              'error'
            );
          }
        );
      }
    })
  }
}
