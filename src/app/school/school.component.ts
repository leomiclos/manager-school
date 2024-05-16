import { Component } from '@angular/core';
import { School } from '../model/school';
import { CommonModule } from '@angular/common';
import { SchoolService } from './school.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AlterSchoolComponent } from '../modal/alter-school/alter-school.component';
import { InsertSchoolComponent } from '../modal/insert-school/insert-school.component';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule, AlterSchoolComponent, InsertSchoolComponent],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css',
  providers: [BsModalService],

})
export class SchoolComponent {
  notHaveAlert: boolean = true;
  selectedSchool: School | null = null

  modalRef?: BsModalRef

  schools: School[] = [];
  school: School = {
    iCodEscola: 0,
    sDescricao: '',
  };
  constructor(private schoolService: SchoolService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(){
    this.getAllSchools();
  }

  openAlterModal(school: School) {
    this.selectedSchool = school

    const initialState = {
      school: this.selectedSchool
    }
    this.modalRef = this.modalService.show(AlterSchoolComponent, {initialState})
  }

  openInsertModal() {

    this.modalRef = this.modalService.show(InsertSchoolComponent)
  }


  getAllSchools() {
    this.schoolService.getAllSchools().subscribe((data) => {
      this.schools = data;
      console.log(this.schools);


      if (this.schools.length > 0) {
        this.school = this.schools[0];
        this.notHaveAlert = false;
      } else {
        this.notHaveAlert = true;
      }
    });
  }
}
