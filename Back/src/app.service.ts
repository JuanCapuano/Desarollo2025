import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelloEntity } from './entities/hello.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(HelloEntity) private repository: Repository<HelloEntity>) { }
  
  async find():Promise<HelloEntity[]> {
    return await this.repository.find();
  }
}
