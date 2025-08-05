// Importaciones necesarias para el componente
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../order.service'; // Servicio para manejar pedidos
import { PRODUCTOS, RESTAURANTES } from './mock'; // Datos simulados productos y restaurantes
import { CIUDADES } from './mock'; // Datos simulados ciudades
import { Router } from '@angular/router';

@Component({
  selector: 'app-order.component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  formulario: FormGroup; // Formulario reactivo
  error = ''; // Mensaje de error para mostrar
  success = ''; // Mensaje de éxito para mostrar
  restaurantes = RESTAURANTES; // Lista de restaurantes para mostrar en el select
  cuidades = CIUDADES; // Lista de ciudades para mostrar en el select
  productos = PRODUCTOS; // Lista de productos para mostrar en el select múltiple

  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService, // Servicio para enviar órdenes
    private router: Router
  ) {
    this.isLoggedIn = !!localStorage.getItem('access_token'); //true si hay token en localStorage
    if (!this.isLoggedIn) {
    // redirigir al login
    setTimeout(() => this.router.navigate(['/login']), 2000);
  } 
    // Inicialización del formulario reactivo con validaciones
    this.formulario = this.fb.group({
      restaurantId: [null, [Validators.required, Validators.min(1)]], // Selección restaurante requerida, id mínimo 1
      products: [[], [Validators.required, Validators.minLength(1)]], // Productos requeridos, al menos 1 producto
      location: this.fb.group({ // Grupo anidado para ubicación
        street: ['', [Validators.required, Validators.minLength(4)]], // Calle requerida y mínimo 4 caracteres
        number: [null, [Validators.required, Validators.min(1)]], // Número requerido, mínimo 1
        cityId: [null, [Validators.required, Validators.min(1)]], // Ciudad requerida, id mínimo 1
        location: this.fb.group({ // Grupo anidado para coordenadas
          lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]], // Latitud válida
          lng: [null, [Validators.required, Validators.min(-180), Validators.max(180)]] // Longitud válida
        })
      })
    });
  }

  // Método asincrónico para enviar la orden cuando se envía el formulario
  async enviarOrden() {
    // Si el formulario es inválido, mostrar error y salir
    if (this.formulario.invalid) {
      this.error = 'Por favor, completa todos los campos';
      this.success = '';
      return;
    }

    // Verificar que el usuario esté autenticado con token en localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'Tenés que iniciar sesión para registrar una orden';
      // Redirigir a login tras 2 segundos
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    try {
      this.error = ''; // Limpiar errores previos
      const raw = this.formulario.value; // Obtener valor del formulario

      // Asegurarse que los productos sean números (ids)
      raw.products = raw.products.map((id: any) => Number(id));

      // Llamar al servicio para crear la orden y esperar resultado
      const nuevaOrden = await this.orderService.crearOrden(raw);

      // Reiniciar el formulario luego de enviar
      this.formulario.reset();

      // Mostrar mensaje de éxito
      this.success = 'Orden registrada exitosamente.';

      // Redirigir a pantalla de pago pasando el id de la nueva orden luego de 2 segundos
      setTimeout(() => this.router.navigate(['/payment', nuevaOrden.id]), 2000);

    } catch (error: any) {
      // Captura cualquier error en el envío y mostrar mensaje
      console.error('Error capturado:', error);
      this.error = 'Error al registrar la orden';
      this.success = '';
    }
  }
}
