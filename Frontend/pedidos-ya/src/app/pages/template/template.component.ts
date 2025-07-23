import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  constructor(private globalStatusService: GlobalStatusService, private router:Router) {}

  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }

  mostrarModalCerrarSesion = false;

cerrarSesion() {
  this.mostrarModalCerrarSesion = true;
}

confirmarCerrarSesion() {
  localStorage.removeItem('access_token');
  this.router.navigate(['/home']);
  this.mostrarModalCerrarSesion = false;
}

cancelarCerrarSesion() {
  this.mostrarModalCerrarSesion = false;
}


  verPerfil() {
   this.router.navigate(['/perfil']);
}

}
