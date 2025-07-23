import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

//Module principal de la aplicación
//Importa los módulos necesarios y configura la conexión a la base de datos
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        database: 'orders',
        username: 'postgres',
        password: 'mipassword',
        synchronize: true,
        entities,
        port:5437
      }),
      TypeOrmModule.forFeature(entities),
      OrderModule,
      PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

