import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Pagination , IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create({
      order: { id: createPaymentDto.orderId }, // Relaciona el pago con la orden
      status: PaymentStatus.PENDING, //estado inicial del pago
      transactionDetails: {
        transactionId: createPaymentDto.transactionDetails.transactionId, 
        paymentStatus: createPaymentDto.transactionDetails.paymentStatus,
      },
      amount: createPaymentDto.amount,
      method: createPaymentDto.method,
      paymentTime: new Date(),
      
    });
    return await this.paymentRepository.save(payment); 
  }





//async es una función que permite manejar operaciones asíncronas, siempre devuelve una promesa.
//await es una palabra clave que se utiliza para esperar a que una promesa se resuelva, 
// Pausa la ejecución de la función hasta que una promesa se resuelva o se rechace.
//una promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante
//una promesa puede estar en uno de los siguientes estados: pendiente, cumplida o rechazada.
//la diferencia entre promesa y resultado es que una promesa es un objeto que representa una operación asíncrona,
//mientras que un resultado es el valor final de esa operación una vez que se ha completado,
//cuando devolvemos la promesa no podemos acceder al resultado directamente hasta que la promesa se resuelva.




//findAll para obtener todos los pagos con paginación
  async findAll(options: IPaginationOptions): Promise<Pagination<Payment>> {
    return paginate<Payment>(
      this.paymentRepository,
      options,
      { relations: ['order'] } // Esto incluye la orden asociada en cada pago
    );
  }
//findOne para obtener un pago específico por su ID
  async findOne(id: number): Promise<Payment | null> {
    return await this.paymentRepository.findOne({ where: { id } });
  }
//update para actualizar un pago específico por su ID
  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id); 
  }
//remove para eliminar un pago específico por su ID
  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
//updateStatus para actualizar el estado de un pago específico por su ID
  async updateStatus(
    id: number, status:PaymentStatus){
      await this.paymentRepository.update(id, { status });
      return this.paymentRepository.findOne({ where: { id } });
    }

//refund para procesar un reembolso de un pago específico por su ID
  async refund(id:number, reason:string){
    const refundDetails = {
      refundTransactionId: `refund-${id}-${Date.now()}`,
      refundStatus: 'completed',
      reason,
    };    
    const refundTime = new Date();
    await this.paymentRepository.update(id, {
      status: PaymentStatus.REFUNDED, // Actualiza el estado del pago a REFUNDED
      refundDetails,
      refundTime,
    }); 
    return this.paymentRepository.findOne({ where: { id } });
  }
}