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
  ) {}

  ngOnInit() {
    this.getSchools();

    this.form = new FormGroup({
      sNome: new FormControl(null, Validators.required),
      dNascimento: new FormControl(null, Validators.required),
      sCPF: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ]),
      sEndereco: new FormControl(null, Validators.required),
      sCelular: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ]),
      iCodEscola: new FormControl(null, Validators.required),
    });
  }

  getSchools() {
    this.schoolService.getAllSchools().subscribe((response) => {
      console.log(response);
      this.schools = response;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.studentService.insertStudent(formData).subscribe(
        (response) => {
          console.log('Dados enviados com sucesso:', response);
          alert('Cadastro realizado com sucesso');
        },
        (error) => {
          console.error('Erro ao enviar dados:', error);
          // Trate o erro conforme necessário
        }
      );
    }
  }
}
