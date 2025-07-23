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
    userId : createOrderDto.userId, // ID del usuario que crea la orden, lo obtenemos del token JWT
    restaurantId: createOrderDto.restaurantId,
    products: createOrderDto.products,
    location: createOrderDto.location,
    status: OrderStatus.PENDING, //estado inicial de la orden
    delivery: null,
  });
  return await this.orderRepository.save(order);
}

//findAll para todas las ordenes con paginación
  async findAll(options: IPaginationOptions): Promise<Pagination<Order>> {
  return paginate<Order>(this.orderRepository, options);
}

//findOne para obtener una orden específica por su ID

  async findOne(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({ where: { id } });
  }
//update para actualizar una orden específica por su ID
  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }
//remove para eliminar una orden específica por su ID
  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
//updateFull para actualizar completamente una orden específica por su ID
 async updateFull(id: number, updateOrderDto: CreateOrderDto) {
  await this.orderRepository.update(id, updateOrderDto);
  return this.orderRepository.findOne({ where: { id } });
}

}
