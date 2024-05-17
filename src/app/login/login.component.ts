import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = {
    user: 'teste',
    password: '123'
  }

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.user.user === this.loginForm.value.user && this.user.password === this.loginForm.value.password){
      this.router.navigate(['/students']);
    }
  }
}
