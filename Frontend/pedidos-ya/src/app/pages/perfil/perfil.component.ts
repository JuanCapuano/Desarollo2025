import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- Importar Router
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports:  [CommonModule]
})
export class PerfilComponent {

  perfil: any = null;
  error = '';

  // Inyectar Router en el constructor
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.verPerfil();
  }

  async verPerfil() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'Tenés que iniciar sesión para ver tu perfil';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    try {
      this.error = '';
      this.perfil = await this.apiService.getMe();
    } catch (e) {
      this.error = 'No se pudo cargar el perfil';
      this.perfil = null;
    }
  }
}
