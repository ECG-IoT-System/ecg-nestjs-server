import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
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
  async findEcgdata12ByUser(params): Promise<Ecgdata12[]> {
    const query: any = {
      where: { user: params.id },
      order: { timestamp: 'ASC' },
    };
    if (params.to) {
      query.where.timestamp = Between(params.from, params.to);
    }
    else {
      query.where.timestamp = MoreThan(params.from);
      // query.take = params.limit || 2304;
    }

    return await this.ecgdata12Repository.find(query);
  }
}