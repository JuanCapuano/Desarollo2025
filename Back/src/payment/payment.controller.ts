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
//endpoint para crear un nuevo pago
  @Post()
  @Permissions('create:payments')
  @UseGuards(AuthGuard)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }
//endpoint para obtener todos los pagos con paginación
// la paginación se maneja con los parámetros de consulta 'page' y 'limit'
//@Query se utiliza para extraer los parámetros de consulta
  @Get()
  @Permissions('read:payments')
  @UseGuards(AuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, //el 1 es para establecer una página por defecto
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, //el 10 es para establecer un límite por defecto
  ) {
    limit = limit > 100 ? 100 : limit; // Limitar el número máximo de resultados por página a 100
    const options: IPaginationOptions = {
      page, // Número de página actual
      limit, // Número de resultados por página
      route: 'http://localhost:3000/payment',  // URL base para la paginación
    };
    return this.paymentService.findAll(options);
  }
//endpoint para obtener un pago específico por su ID
  @Get(':id')
  @Permissions('read:payments')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }
//endpoint para actualizar un pago específico por su ID
  @Patch(':id')
  @Permissions('update:payments')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
//endpoint para eliminar un pago específico por su ID
  @UseGuards(AuthGuard)
  @Permissions('delete:payments')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(+id);
    return { message: 'Deleted' };
  }
//endpoint para actualizar el estado de un pago específico por su ID
  @Put(':id/status')
  @Permissions('update:payments')
  @UseGuards(AuthGuard)
  updateStatus(@Param('id') id: number, @Body() body: { status: PaymentStatus }) {
  return this.paymentService.updateStatus(id, body.status);
}
//endpoint para procesar un reembolso de un pago específico por su ID
  @Post(':id/refund')
  @Permissions('payments:refund')
  @UseGuards(AuthGuard)
  refund(@Param('id') id: number, @Body() body: { reason: string }) {
    return this.paymentService.refund(id, body.reason);
  }

}

