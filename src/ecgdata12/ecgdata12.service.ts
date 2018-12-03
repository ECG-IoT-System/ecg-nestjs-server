import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ecgdata12 } from './ecgdata12.entity';

@Injectable()
export class Ecgdata12Service {
  constructor(
    @InjectRepository(Ecgdata12)
    private readonly ecgdata12Repository: Repository<Ecgdata12>,
  ) { }

  async createEcgdata12(params): Promise<Ecgdata12[]> {
    return await this.ecgdata12Repository.save(params);
  }
}