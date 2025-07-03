import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloEntity } from './entities/hello.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<HelloEntity[]> {
    return await this.appService.find();
  }
}
