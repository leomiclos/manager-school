import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { School } from '../../model/school';
import { SchoolService } from '../../school/school.service';
import { StudentsService } from '../../students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css',
})
export class InsertComponent {
  form!: FormGroup;
  schools: School[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private schoolService: SchoolService,
    private studentService: StudentsService
  ) { }

  ngOnInit() {
    this.getSchools();

    this.form = new FormGroup({
      sNome: new FormControl(null, Validators.required),
      dNascimento: new FormControl(null, Validators.required),
      sCPF: new FormControl(null, [Validators.required,]),
      sEndereco: new FormControl(null, Validators.required),
      sCelular: new FormControl(null, [Validators.required]),
      iCodEscola: new FormControl(null, Validators.required),
    });
  }

  getSchools() {
    this.schoolService.getAllSchools().subscribe((response) => {
      this.schools = response;
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.studentService.insertStudent(formData).subscribe(
        (response) => {
          console.log('Dados enviados com sucesso:', response);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cadastro realizado com sucesso',
          }).then(res => {
            if(res){
              window.location.reload()
            }
          });
        },
        (error) => {
          console.error('Erro ao enviar dados:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Houve um erro ao enviar os dados',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Informação',
        text: 'Formulário inválido',
      });
      console.log('Formulário inválido');
    }
  }

}
