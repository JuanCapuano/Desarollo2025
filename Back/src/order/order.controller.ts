import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req, Query, DefaultValuePipe, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { permission } from 'process';
import { DefaultDeserializer } from 'v8';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';


@Controller('order')
export class OrderController {
  paymentService: any;
  constructor(private readonly orderService: OrderService) {}

  //endpoint para crear una nueva orden
  @Post()
  @Permissions('create:orders')
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.orderService.create({...createOrderDto, userId });
  }


//endpoint para obtener todas las ordenes con paginación, la paginación se maneja con los parámetros de consulta 'page' y 'limit'
  @Get()
@Permissions('read:orders')
@UseGuards(AuthGuard)
async findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
) {
  limit = limit > 100 ? 100 : limit;
  const options: IPaginationOptions = {
    page,
    limit,
    route: 'http://localhost:3000/order',
  };
  return this.orderService.findAll(options);
}

//endpoint para obtener una orden específica por su ID
  //se utiliza el decorador @Param para extraer el ID

  @Get(':id')
  @Permissions('read:orders')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  
//endpoint para actualizar una orden específica por su ID
  @Patch(':id')
  @Permissions('update:orders')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
//endpoint para eliminar una orden específica por su ID
  @UseGuards(AuthGuard)
  @Permissions('delete:orders')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderService.remove(+id);
    return { message: 'Deleted' };
  }
//endpoint para actualizar completamente una orden específica por su ID
  @Put(':id')
  @Permissions('update:orders')
  @UseGuards(AuthGuard)
  updateFull(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.updateFull(+id, createOrderDto);
  }

}
