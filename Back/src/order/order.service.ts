import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Or, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
  const order = this.orderRepository.create({
    userId : createOrderDto.userId, // Assuming userId is passed in the DTO
    restaurantId: createOrderDto.restaurantId,
    products: createOrderDto.products,
    location: createOrderDto.location,
    status: OrderStatus.PENDING,
    delivery: null,
  });
  return await this.orderRepository.save(order);
}

  async findAll(options: IPaginationOptions): Promise<Pagination<Order>> {
  return paginate<Order>(this.orderRepository, options);
}

  async findOne(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

 async updateFull(id: number, updateOrderDto: CreateOrderDto) {
  await this.orderRepository.update(id, updateOrderDto);
  return this.orderRepository.findOne({ where: { id } });
}

}
