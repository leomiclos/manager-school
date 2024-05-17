import { Component } from '@angular/core';
import { StudentsComponent } from '../students/students.component';
import { SchoolComponent } from '../school/school.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [StudentsComponent, SchoolComponent],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {

    constructor(private router: Router){

    }

    toStudents() {
      this.router.navigate(['/students'])
    }

    toSchool() {
      this.router.navigate(['/schools'])
    }

}
