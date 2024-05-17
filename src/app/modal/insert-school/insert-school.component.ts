import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../../school/school.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-school',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert-school.component.html',
  styleUrl: './insert-school.component.css'
})
export class InsertSchoolComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private schoolsService: SchoolService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sDescricao: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.schoolsService.insertSchool(formData).subscribe(
        (response) => {
          console.log('Dados enviados com sucesso:', response);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cadastro realizado com sucesso',
          }).then(res => {
            if(res.isConfirmed){
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
