import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';
  constructor(private http: HttpClient) {}

  async crearOrden(orderData: any) {
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, orderData));
    return response;
  }

  async getOrders() {
    const response = await firstValueFrom(this.http.get<any>(this.apiUrl));
    return response.items;
  }

  async updateOrder(id: number, data: any) {
    const response = await firstValueFrom(this.http.patch<any>(`${this.apiUrl}/${id}`, data));
    return response;
  }

  async deleteOrder(id: number) {
    const response = await firstValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
    return response;
  }

}


