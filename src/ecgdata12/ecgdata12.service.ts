import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, InsertResult } from 'typeorm';
import { Ecgdata12 } from './ecgdata12.entity';

@Injectable()
export class Ecgdata12Service {
  constructor(
    @InjectRepository(Ecgdata12)
    private readonly ecgdata12Repository: Repository<Ecgdata12>,
  ) { }

  async createEcgdata12(params): Promise<InsertResult> {
    return await this.ecgdata12Repository.createQueryBuilder()
      .insert()
      .into(Ecgdata12)
      .values(params)
      .execute();
  }

  async findEcgdata12ByUser(params): Promise<Ecgdata12[]> {
    // find all
    if (!params.from && !params.limit && !params.to)
      return await this.ecgdata12Repository.find({user: { id: params.id }});

    const query: any = {
      where: { user: { id : params.id }},
      order: { timestamp: 'ASC' },
    };
    if (params.to) {
      query.where.timestamp = Between(params.from, params.to);
    }
    else {
      query.where.timestamp = MoreThan(params.from);
      query.take = params.limit || 2304;
    }

    return await this.ecgdata12Repository.find(query);
  }

  async deleteEcgdata12ByUser(user){
    return await this.ecgdata12Repository.delete({user});
  }
}