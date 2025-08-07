import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payment';
  constructor(private http: HttpClient) {}

  async crearPago(paymentData: any) {
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, paymentData));
    return response;
  }

  async getPayments() {
    const response = await firstValueFrom(this.http.get<any>(this.apiUrl));
    return response.items;
  }
}
