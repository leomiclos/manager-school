import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../model/student';
import { StudentsService } from '../../students/students.service';
import { School } from '../../model/school';
import { SchoolService } from '../../school/school.service';
import Swal from 'sweetalert2';

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

  constructor(private schoolService: SchoolService) { }

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
      const updatedSchool: School = {
        sDescricao: this.form.get('sDescricao')?.value,
        iCodEscola: this.school.iCodEscola
      };

      Swal.fire({
        title: 'Você tem certeza?',
        text: "Você deseja atualizar os dados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, atualize!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.schoolService.updateSchool(updatedSchool, this.school.iCodEscola).subscribe(
            (response) => {
              Swal.fire(
                'Atualizado!',
                'Dados atualizados com sucesso.',
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
                'Houve um erro ao atualizar a escola.',
                'error'
              );
              console.error('Erro ao atualizar a escola', error);
            }
          );
        }
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Informação',
        text: 'Formulário inválido',
      });
      console.log('Formulário inválido');
    }
  }

  delete() {
    const id = this.school.iCodEscola;

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then(result => {
      if (result.isConfirmed) {
        this.schoolService.deleteSchool(id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'O registro foi deletado.',
              'success'
            );
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
