import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    private http: HttpClient
  ){
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      sDescricao: new FormControl(null, Validators.required),
    })
  }

  onSubmit(){
    if (this.form.valid) {
      const formData = this.form.value;
      // Enviar os dados para a API
      this.http.post('http://localhost:5043/escola', formData).subscribe(
        (response) => {
          console.log('Dados enviados com sucesso:', response);
          alert('Cadastro realizado com sucesso')
        },
        (error) => {
          console.error('Erro ao enviar dados:', error);
          // Trate o erro conforme necessário
        }
      );
    }
  }
}
