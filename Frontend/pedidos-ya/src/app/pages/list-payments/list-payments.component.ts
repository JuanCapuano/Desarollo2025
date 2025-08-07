import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../payment/payment.service';

@Component({
  selector: 'app-list-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-payments.component.html',
  styleUrl: './list-payments.component.css'
})
export class ListPaymentsComponent {
  payments: any[] = [];
  error = '';

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit() {
    this.cargarPagos();
  }

  async cargarPagos() {
    // Verifica si el usuario tiene token, si no lo redirige al login
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'Tenés que iniciar sesión para ver las órdenes.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    try {
      this.payments = await this.paymentService.getPayments();
      this.error = '';
    } catch (err) {
      console.error(err);
      this.error = 'No se pudieron cargar las órdenes.';
    }
  }
}

