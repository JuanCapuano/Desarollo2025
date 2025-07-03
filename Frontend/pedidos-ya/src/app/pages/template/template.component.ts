import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  constructor(private globalStatusService: GlobalStatusService, private router:Router) {}

  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }
  verPerfil() {
   this.router.navigate(['/perfil']);
}
}
