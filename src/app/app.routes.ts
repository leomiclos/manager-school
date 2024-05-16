import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScreenComponent } from './screen/screen.component';
import { StudentsComponent } from './students/students.component';
import { SchoolComponent } from './school/school.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: StudentsComponent },
  { path: 'schools', component: SchoolComponent },



];

