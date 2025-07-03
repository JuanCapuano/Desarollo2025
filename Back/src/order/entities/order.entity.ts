import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Payment } from '../../payment/entities/payment.entity';
export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}
@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @Column("int", { array: true })
  products: number[];

  @Column({ type: 'jsonb' })
  location: {
    street: string;
    number: string;
    cityId: number;
    location: {
      lat: number;
      lng: number;
    };
  };

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
  
  @Column( { type: 'varchar', nullable: true })
  delivery: string | null;

  
}
