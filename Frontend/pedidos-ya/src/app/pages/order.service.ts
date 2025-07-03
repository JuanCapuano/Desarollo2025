import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  async crearOrden(orderData: any) {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No hay token, logueate primero');

    const response = await axios.post('http://localhost:3000/order', orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta del backend:', response.data);
    return response.data;
  }
}

