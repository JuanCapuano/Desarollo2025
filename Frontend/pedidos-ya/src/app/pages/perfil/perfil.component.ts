// Importaciones necesarias para el componente
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para navegar entre rutas
import { ApiService } from '../../services/api.service'; // Servicio para consumir API
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule]
})
export class PerfilComponent {

  perfil: any = null; // Objeto para guardar datos del perfil
  error = ''; // Mensaje de error para mostrar

  // Inyectar Router para navegación y ApiService para consumir API
  constructor(private router: Router, private apiService: ApiService) {}

  // Ciclo de vida: al inicializar el componente, obtener datos del perfil
  ngOnInit() {
    this.verPerfil();
  }

  // Método asíncrono para obtener datos del perfil del usuario
  async verPerfil() {
    // Obtener token del localStorage para validar sesión
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Si no hay token, mostrar error y redirigir a login tras 2 segundos
      this.error = 'Tenés que iniciar sesión para ver tu perfil';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    try {
      this.error = ''; // Limpiar cualquier error previo
      this.perfil = await this.apiService.getMe(); // Llamar al API para obtener perfil
    } catch (e) {
      // Si ocurre un error, mostrar mensaje y limpiar perfil
      this.error = 'No se pudo cargar el perfil';
      this.perfil = null;
    }
  }
}
