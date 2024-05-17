import { Component } from '@angular/core';
import { StudentsComponent } from '../students/students.component';
import { SchoolComponent } from '../school/school.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [StudentsComponent, SchoolComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor(private router: Router){

    }

    toStudents() {
      this.router.navigate(['/students'])
    }

    toSchool() {
      this.router.navigate(['/schools'])
    }

}
