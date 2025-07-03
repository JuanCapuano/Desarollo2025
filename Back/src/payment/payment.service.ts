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
      order: { id: createPaymentDto.orderId },
      status: PaymentStatus.PENDING,
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

  async findAll(options: IPaginationOptions): Promise<Pagination<Payment>> {
    return paginate<Payment>(this.paymentRepository, options)
  }

  async findOne(id: number): Promise<Payment | null> {
    return await this.paymentRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }

  async updateStatus(
    id: number, status:PaymentStatus){
      await this.paymentRepository.update(id, { status });
      return this.paymentRepository.findOne({ where: { id } });
    }


  async refund(id:number, reason:string){
    const refundDetails = {
      refundTransactionId: `refund-${id}-${Date.now()}`,
      refundStatus: 'completed',
      reason,
    };    
    const refundTime = new Date();
    await this.paymentRepository.update(id, {
      status: PaymentStatus.REFUNDED,
      refundDetails,
      refundTime,
    }); 
    return this.paymentRepository.findOne({ where: { id } });
  }
}