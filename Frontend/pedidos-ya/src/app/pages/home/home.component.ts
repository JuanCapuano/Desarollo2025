import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Lista de items que se muestran en pantalla, cada uno con imagen, nombre y descripción
  items: Array<{ image: string; name: string; description: string }> = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Hamburguesa Clásica',
      description: 'Jugosa hamburguesa con queso, lechuga y tomate.',
    },
    {
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Pizza Pepperoni',
      description: 'Clásica pizza de mozzarella rodajas de pepperoni crujiente.'
    },
    {
      image:'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Sandwich Completo',
      description: 'Sandwich Completo de jamón y queso con tomate y lechuga'
    }
  ];

  // Inyección de dependencias necesarias: API, estado global y router
  constructor(
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService,
    private readonly router: Router
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.initialization();
  }

  // Función placeholder para inicializaciones futuras
  async initialization(): Promise<void> {}

  
}
