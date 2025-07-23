// Importar decoradores y módulos necesarios
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Servicio API para registro
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
  formulario: FormGroup; // Formulario reactivo
  error = ''; // Mensaje de error
  success = ''; // Mensaje de éxito

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    // Inicializar formulario con validaciones
    this.formulario = this.fb.group({
      email: ["", [Validators.required, Validators.email]], // Email requerido y formato válido
      password: ["", [Validators.required, Validators.minLength(6)]] // Contraseña requerida y mínimo 6 caracteres
    });
  }

  // Método para registrar usuario
  async register() {
    // Si el formulario es inválido, marcar todos como tocados para mostrar errores y mostrar mensaje
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Por favor complete todos los campos';
      this.success = '';
      return;
    }

    try {
      this.error = ''; // Limpiar errores previos

      // Loggear valores del formulario para debug
      console.log('Datos del formulario:', this.formulario.value);

      // Llamar al servicio API para registrar usuario con los datos del formulario
      const response = await this.apiService.register(this.formulario.value);

      // Loggear respuesta del backend para debug
      console.log('Respuesta del backend:', response);

      // Si la respuesta indica creación exitosa
      if (response.status === 'created') {
        this.success = 'Registro exitoso. Ya podés iniciar sesión.';
        // Redirigir a home luego de 2 segundos
        setTimeout(() => this.router.navigate(['/home']), 2000);
      } else {
        // Si no se pudo registrar, mostrar error genérico
        this.error = 'No se pudo registrar. Verificá los datos.';
      }
    } catch (error) {
      // Capturar errores de la llamada API y mostrar mensaje
      this.error = 'Error en el registro, intentá nuevamente.';
      this.success = '';
    }
  }
}
