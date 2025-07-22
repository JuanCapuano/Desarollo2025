import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment.component',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  formulario: FormGroup;
  orderId: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private paymentService: PaymentService) {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.formulario = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      method: ['', Validators.required],
      transactionId: ['', Validators.required],
      paymentStatus: ['', Validators.required]
    });
  }

  success = '';
  error = '';

  async enviarPago() {
    if (this.formulario.invalid) {
      this.error = 'Por favor, completa todos los campos correctamente.';
      this.success = '';
      return;
    }

    const paymentData = {
      orderId: this.orderId,
      amount: this.formulario.value.amount,
      method: this.formulario.value.method,
      transactionDetails: {
        transactionId: this.formulario.value.transactionId,
        paymentStatus: this.formulario.value.paymentStatus
      }
    };

    try {
    await this.paymentService.crearPago(paymentData);
    this.success = 'Pago realizado con éxito';
    this.error = '';
    this.formulario.reset();
    // Acá podrías redirigir, mostrar un mensaje, etc.
  } catch (error) {
    this.error = 'Error al procesar el pago. Por favor, inténtalo de nuevo.';
    this.success = '';
    console.error(error);
  }
}


}
