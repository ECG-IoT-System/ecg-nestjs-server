import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Between, MoreThan, InsertQueryBuilder, InsertResult, DeleteResult } from 'typeorm';
import { Gsensor } from '../gsensor/gsensor.entity';

@Injectable()
export class GsensorService {
  constructor(
    @InjectRepository(Gsensor)
    private readonly gsensorRepository: Repository<Gsensor>,
  ) { }

  async createGensors(params): Promise<InsertResult> {
    return await this.gsensorRepository.createQueryBuilder()
    .insert()
    .into(Gsensor)
    .values(params)
    .execute()
  }

  async findGsensorByUser(params): Promise<Gsensor[]> {
    if(!params.from && !params.limit && !params.to)
      return await this.gsensorRepository.find({user: { id: params.id }});
    const query: any = {
      where: { user: { id: params.id } },
      order: { timestamp: 'ASC' },
    };

    if (params.to) {
      query.where.timestamp = Between(params.from, params.to);
    }
    else {
      query.where.timestamp = MoreThan(params.from);
      query.take = params.limit || 2304;
    }

    return await this.gsensorRepository.find(query);
  }

  async deleteGsensorByUser(user): Promise<DeleteResult> {
    return await this.gsensorRepository.delete({user});
  }
}