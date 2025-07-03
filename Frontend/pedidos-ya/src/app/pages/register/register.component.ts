import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formulario : FormGroup;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private apiService : ApiService , private router : Router) {
    this.formulario = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });
  }

    async register(){
    if (this.formulario.invalid){
      this.formulario.markAllAsTouched()
      this.error = 'Por favor complete todos los campos';
      this.success= '';
      return
    }
    try {
    this.error = '';
    console.log('Datos del formulario:', this.formulario.value);
    const response = await this.apiService.register(this.formulario.value);
    console.log('Respuesta del backend:', response);

    if (response.status === 'created') {
      this.success = 'Registro exitoso. Ya podés iniciar sesión.';
      setTimeout(() => this.router.navigate(['/home']), 2000);
    } else {
      this.error = 'No se pudo registrar. Verificá los datos.';
    }
  } catch (error) {
    this.error = 'Error en el registro, intentá nuevamente.';
    this.success = '';
  }
}

}



  








