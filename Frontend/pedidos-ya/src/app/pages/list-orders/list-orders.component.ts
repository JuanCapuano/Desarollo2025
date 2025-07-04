import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-orders.component',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})

export class ListOrdersComponent{
  ordenes: any[] = [];
  error = '';
  ordenEditando: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.cargarOrdenes();
  }

  async cargarOrdenes() {
    try {
      this.ordenes = await this.orderService.getOrders();
    } catch (err) {
      this.error = 'No se pudieron cargar las órdenes.';
      console.error(err);
    }
  }

  editarOrden(orden: any) {
    this.ordenEditando = JSON.parse(JSON.stringify(orden)); // Clonamos para evitar referencias directas
  }

  cancelarEdicion() {
    this.ordenEditando = null;
  }

  async guardarCambios() {
    try {
      // Preparar solo los campos que vas a modificar para el patch
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

      // Actualizar la lista local con los datos nuevos
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
}
