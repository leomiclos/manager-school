import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../model/student';
import { StudentsService } from '../../students/students.service';
import { School } from '../../model/school';
import { SchoolService } from '../../school/school.service';

@Component({
  selector: 'app-alter-school',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alter-school.component.html',
  styleUrl: './alter-school.component.css'
})
export class AlterSchoolComponent {

  @Input() school!: School;

  form!: FormGroup;

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    if (this.school) {
      this.form = new FormGroup({
        sDescricao: new FormControl(this.school.sDescricao, Validators.required),
      });
    }
    console.log(this.school);

  }



  attStudent() {
    if (this.form.valid) {
      const updatedStudent: School = {
        sDescricao: this.form.get('sDescricao')?.value,
        iCodEscola: this.school.iCodEscola

      };

      this.schoolService.updateSchool(updatedStudent, this.school.iCodEscola).subscribe(
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
