import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from '../../students/students.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-alter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alter.component.html',
  styleUrl: './alter.component.css',
})
export class AlterComponent implements OnInit {
  @Input() aluno!: Student;

  form!: FormGroup;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    if (this.aluno) {
      this.form = new FormGroup({
        nome: new FormControl(this.aluno.sNome, Validators.required),
        endereco: new FormControl(this.aluno.sEndereco, Validators.required),
        celular: new FormControl(this.aluno.sCelular, Validators.required),
      });
    }
    console.log(this.aluno);

  }



  attStudent() {
    if (this.form.valid) {
      const updatedStudent: Student = {
        iCodAluno: this.aluno.iCodAluno,
        sNome: this.form.get('nome')?.value,
        sEndereco: this.form.get('endereco')?.value,
        sCelular: this.form.get('celular')?.value,
        dNascimento: this.aluno.dNascimento,
        sCPF: this.aluno.sCPF,
        iCodEscola: this.aluno.iCodEscola,
      };

      this.studentsService.updateStudent(updatedStudent).subscribe(
        (response) => {
          alert('Dados atualizados com sucesso')
          console.log('Estudante atualizado com sucesso', response);
        },
        (error) => {
          console.error('Erro ao atualizar o estudante', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
