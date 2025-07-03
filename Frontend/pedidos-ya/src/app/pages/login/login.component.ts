import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  formulario: FormGroup;
  error = '';
  success = '';
  constructor(private fb: FormBuilder, private apiService : ApiService , private router : Router) {
    this.formulario = this.fb.group({

      email: ["", [Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });

  }

  async login(){
    if (this.formulario.invalid){
      this.formulario.markAllAsTouched()
      this.error = 'Por favor complete todos los campos';
      this.success= '';
      return
    }
    try{
      this.error= '';
      await this.apiService.login(this.formulario.value);
      this.success = '¡Inicio de sesión exitoso!';
      setTimeout(() => this.router.navigate(['/home']), 2000);
    }catch (error){
      this.error = 'usuario o contraseña incorrecta';
      this.success = '';
      return
    }
  }

  
}