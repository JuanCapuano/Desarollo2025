import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],  // corregí styleUrl por styleUrls
})
export class TemplateComponent implements OnInit {
  mostrarModalCerrarSesion = false;
  isLoggedIn = false;  // <-- variable para estado de sesión

  constructor(
    private globalStatusService: GlobalStatusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;
  }

  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }

  cerrarSesion() {
    this.mostrarModalCerrarSesion = true;
  }

  confirmarCerrarSesion() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
    this.mostrarModalCerrarSesion = false;
    this.checkLogin();  // Actualizo estado al cerrar sesión
  }

  cancelarCerrarSesion() {
    this.mostrarModalCerrarSesion = false;
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }
}

