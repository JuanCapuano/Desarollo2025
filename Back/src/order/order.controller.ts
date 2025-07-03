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

  
  @Post()
  @Permissions('create:orders')
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.orderService.create({...createOrderDto, userId });
  }



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

  @Get(':id')
  @Permissions('read:orders')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  

  @Patch(':id')
  @Permissions('update:orders')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @UseGuards(AuthGuard)
  @Permissions('delete:orders')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderService.remove(+id);
    return { message: 'Deleted' };
  }

  @Put(':id')
  @Permissions('update:orders')
  @UseGuards(AuthGuard)
  updateFull(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.updateFull(+id, createOrderDto);
  }

}
