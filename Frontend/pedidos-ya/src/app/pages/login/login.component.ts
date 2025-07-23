import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login.component', // Nombre del selector que se usa en el HTML para este componente
  standalone: true, // Define que este componente es autónomo (no requiere declaración en un módulo)
  imports: [ReactiveFormsModule , CommonModule, RouterModule], // Módulos necesarios para el template
  templateUrl: './login.component.html', // Ruta del HTML asociado
  styleUrl: './login.component.css' // Ruta del CSS asociado
})
export class LoginComponent {
  formulario: FormGroup; // Formulario reactivo para capturar los datos del login
  error = ''; // Variable para mostrar mensajes de error
  success = ''; // Variable para mostrar mensajes de éxito

  constructor(
    private fb: FormBuilder, // Constructor de formularios reactivos
    private apiService: ApiService, // Servicio para hacer llamadas a la API
    private router: Router // Permite la navegación programática
  ) {
    // Se inicializa el formulario con validadores
    this.formulario = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método asincrónico que se ejecuta al enviar el formulario
  async login() {
    if (this.formulario.invalid) {
      // Marca todos los campos como "tocados" para mostrar errores
      this.formulario.markAllAsTouched();
      this.error = 'Por favor complete todos los campos';
      this.success = '';
      return;
    }

    try {
      this.error = '';
      // Llama al servicio de login con los datos del formulario
      await this.apiService.login(this.formulario.value);
      this.success = '¡Inicio de sesión exitoso!';
      // Redirige a la página principal luego de 2 segundos
      setTimeout(() => this.router.navigate(['/home']), 2000);
    } catch (error) {
      // En caso de error, muestra mensaje de usuario o contraseña incorrectos
      this.error = 'usuario o contraseña incorrecta';
      this.success = '';
    }
  }
}
