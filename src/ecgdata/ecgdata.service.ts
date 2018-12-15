import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Between, MoreThan, InsertQueryBuilder, InsertResult, UpdateResult } from 'typeorm';
import { Ecgdata } from './ecgdata.entity';

@Injectable()
export class EcgdataService {
  constructor(
    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,
  ) { }

  async createEcgdata(params): Promise<InsertResult> {
    return await this.ecgdataRepository.createQueryBuilder()
    .insert()
    .into(Ecgdata)
    .values(params)
    .execute();
  }

  async findEcgdataByUser(params): Promise<Ecgdata[]> {
    // find all
    if (!params.from && !params.limit && !params.to)
      return await this.ecgdataRepository.find({user: { id: params.id }});

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

    return await this.ecgdataRepository.find(query);
  }

  async updateAfstatByUser(params) {
    const query: any = {
      user: params.id,
      timestamp: Between(params.from, params.to),
    };
    const istrue = (params.afstat === 'true' || params.afstat === '1');
    return await this.ecgdataRepository.update(query, { afstat: istrue });
  }

  async deleteEcgdataByUser(user) {
    return await this.ecgdataRepository.delete({user});
  }
}