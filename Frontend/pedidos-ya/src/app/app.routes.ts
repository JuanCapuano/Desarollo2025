import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './pages/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ListPaymentsComponent } from './pages/list-payments/list-payments.component';

export const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'order', 
        component: OrderComponent
      },
      {path: 'login', 
        component:LoginComponent
      },
      {path: 'register',
         component:RegisterComponent
      },
      {
        path:'perfil',
         component:PerfilComponent
      },
      {
        path:'listOrders',
        component:ListOrdersComponent
      },
      { path: 'payment/:orderId',
        component:PaymentComponent
      },
      {
        path: 'listPayments',
        component: ListPaymentsComponent
      }
    ],
  },
];


