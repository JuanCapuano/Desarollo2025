import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
}

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  method: string;

  @Column({ type: 'jsonb' })
  transactionDetails: {
    transactionId: string;
    paymentStatus: string;
  };

   @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @CreateDateColumn()
  paymentTime: Date;

  

  @Column({ type: 'jsonb', nullable: true })
  refundDetails?: {
    refundTransactionId: string;
    refundStatus: string;
  };

  @Column({ type: 'timestamp', nullable: true })
  refundTime?: Date;

  @OneToOne(() => Order,{ onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;
}

