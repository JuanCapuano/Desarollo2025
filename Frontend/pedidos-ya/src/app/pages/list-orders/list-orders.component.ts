import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-orders.component',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent {
  ordenes: any[] = []; // Lista de pedidos obtenidos
  error = ''; // Mensaje de error para mostrar en pantalla
  ordenEditando: any = null; // Pedido que se está editando actualmente

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.cargarOrdenes();
  }

  async cargarOrdenes() {
    // Verifica si el usuario tiene token, si no lo redirige al login
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'Tenés que iniciar sesión para ver las órdenes.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    try {
      this.ordenes = await this.orderService.getOrders();
      this.error = '';
    } catch (err) {
      console.error(err);
      this.error = 'No se pudieron cargar las órdenes.';
    }
  }

  // Al hacer clic en "Modificar", se clona la orden para editarla sin modificar la original
  editarOrden(orden: any) {
    this.ordenEditando = JSON.parse(JSON.stringify(orden));
  }

  cancelarEdicion() {
    this.ordenEditando = null;
  }

  // Guarda los cambios de la orden editada
  async guardarCambios() {
    try {
      const dataToUpdate = {
        status: this.ordenEditando.status,
        location: {
          street: this.ordenEditando.location.street,
          number: this.ordenEditando.location.number,
          cityId: this.ordenEditando.location.cityId,
          location: {
            lat: this.ordenEditando.location.location.lat,
            lng: this.ordenEditando.location.location.lng,
          },
        },
      };

      const updatedOrder = await this.orderService.updateOrder(this.ordenEditando.id, dataToUpdate);

      // Reemplaza la orden antigua por la actualizada
      const index = this.ordenes.findIndex(o => o.id === updatedOrder.id);
      if (index !== -1) {
        this.ordenes[index] = updatedOrder;
      }

      this.ordenEditando = null;
      this.error = '';
    } catch (err) {
      this.error = 'Error al guardar los cambios.';
      console.error(err);
    }
  }

  mostrarModalEliminarOrden = false;
  ordenIdAEliminar: number | null = null;

  // Abre el modal y guarda el ID de la orden a eliminar
  abrirModalEliminar(id: number) {
    this.ordenIdAEliminar = id;
    this.mostrarModalEliminarOrden = true;
  }

  // Confirma la eliminación de la orden
  async confirmarEliminarOrden() {
    if (this.ordenIdAEliminar === null) return;

    try {
      await this.eliminarOrden(this.ordenIdAEliminar);
      this.error = '';
    } catch (err) {
      console.error(err);
      this.error = 'Error al eliminar la orden';
    } finally {
      this.mostrarModalEliminarOrden = false;
      this.ordenIdAEliminar = null;
    }
  }

  // Lógica real para eliminar la orden
  async eliminarOrden(id: number) {
    try {
      await this.orderService.deleteOrder(id);
      this.ordenes = this.ordenes.filter(o => o.id !== id);
      this.error = '';
    } catch (err) {
      console.error(err);
      this.error = 'Error al eliminar la orden';
    }
  }

  cancelarEliminarOrden() {
    this.mostrarModalEliminarOrden = false;
    this.ordenIdAEliminar = null;
  }
}
