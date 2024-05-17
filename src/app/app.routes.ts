import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { StudentsComponent } from './students/students.component';
import { SchoolComponent } from './school/school.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path: 'students', component: StudentsComponent },
    { path: 'schools', component: SchoolComponent },
  ]},
];
