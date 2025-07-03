import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OrderService } from '../order.service';
import { PRODUCTOS, RESTAURANTES } from './mock';
import { CIUDADES } from './mock';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order.component',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  formulario: FormGroup;
  error = '';
  success = '';
  apiService: any;
  constructor(private fb: FormBuilder, private orderService : OrderService, private router: Router) {
    this.formulario = this.fb.group({
      restaurantId: [null, [ Validators.required, Validators.min(1) ]],
      products: [[], [ Validators.required , Validators.minLength(1) ]],
      location: this.fb.group({
        street: ["", [ Validators.required, Validators.minLength(4) ]],
        number: [null, [ Validators.required, Validators.min(1) ]],
        cityId: [null, [ Validators.required, Validators.min(1) ]],
        location: this.fb.group({
          lat: [null, [ Validators.required, Validators.min(-90), Validators.max(90) ]],
          lng: [null, [ Validators.required , Validators.min(-180), Validators.max(180) ]]
        })

    })
    });

  }

   restaurantes = RESTAURANTES;
   cuidades = CIUDADES;
   productos = PRODUCTOS;
   

   async enviarOrden() {
    if (this.formulario.invalid) {
      this.error = 'Por favor, completa todos los campos';
      this.success = '';
      return;
    }

    const token = localStorage.getItem('access_token');
    if(!token){
      this.error = 'Tenés que iniciar sesión para registrar una orden';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
    }

    
    try {
      this.error = '';

      const raw = this.formulario.value;

      raw.products = raw.products.map((id: any) => Number(id));

      await this.orderService.crearOrden(raw);
      this.formulario.reset();
      this.success = 'Orden registrada exitosamente.';
    } 
   catch (error: any) {
    console.error('Error capturado:', error);
    this.error = 'Error al registrar la orden';
    this.success = '';
  }
  }
}

