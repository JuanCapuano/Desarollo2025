import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, DefaultValuePipe, Query, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatus } from './entities/payment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Permissions('create:payments')
  @UseGuards(AuthGuard)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @Permissions('read:payments')
  @UseGuards(AuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    limit = limit > 100 ? 100 : limit;
    const options: IPaginationOptions = {
      page,
      limit,
      route: 'http://localhost:3000/payment',  
    };
    return this.paymentService.findAll(options);
  }

  @Get(':id')
  @Permissions('read:payments')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('update:payments')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard)
  @Permissions('delete:payments')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(+id);
    return { message: 'Deleted' };
  }

  @Put(':id/status')
  @Permissions('update:payments')
  @UseGuards(AuthGuard)
  updateStatus(@Param('id') id: number, @Body() body: { status: PaymentStatus }) {
  return this.paymentService.updateStatus(id, body.status);
}

  @Post(':id/refund')
  @Permissions('payments:refund')
  @UseGuards(AuthGuard)
  refund(@Param('id') id: number, @Body() body: { reason: string }) {
    return this.paymentService.refund(id, body.reason);
  }

}
