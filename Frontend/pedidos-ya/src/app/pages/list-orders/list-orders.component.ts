import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.cargarOrdenes();
  }

  async cargarOrdenes() {
    //Validamos que tenga token antes de hacer la petición
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

  mostrarModalEliminarOrden = false;
ordenIdAEliminar: number | null = null;

// Cuando clickeás el botón eliminar: solo abrimos modal y guardamos id
abrirModalEliminar(id: number) {
  this.ordenIdAEliminar = id;
  this.mostrarModalEliminarOrden = true;
}

// Cuando confirmás, llamás al método real que ya tenés, pasando el id guardado
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

  async eliminarOrden(id: number) {
    try {
      await this.orderService.deleteOrder(id);

     // Eliminamos la orden del array local para actualizar la vista
      this.ordenes = this.ordenes.filter(o => o.id !== id);

      this.error = '';
  }   catch (err) {
      console.error(err);
      this.error = 'Error al eliminar la orden';
  }
}

cancelarEliminarOrden() {
  this.mostrarModalEliminarOrden = false;
  this.ordenIdAEliminar = null;
}

}
