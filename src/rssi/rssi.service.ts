import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Between, MoreThan, InsertQueryBuilder, InsertResult, DeleteResult } from 'typeorm';
import { Ecgdata } from '../ecgdata/ecgdata.entity';
import { Gsensor } from '../gsensor/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from './rssi.entity';

@Injectable()
export class RssiService {
  constructor(
    @InjectRepository(Rssi)
    private readonly rssiRepository: Repository<Rssi>,
  ) { }

  async createRssi(param): Promise<Rssi> {
    console.log(param);
    return await this.rssiRepository.save(param);
  }

  async findRssiByUser(params): Promise<Rssi[]> {

    if(!params.from && !params.limit && !params.to)
      return await this.rssiRepository.find({user: { id: params.id }});
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

    return await this.rssiRepository.find(query);
  }

  async deleteRssiByUser(user): Promise<DeleteResult> {
    return await this.rssiRepository.delete({user});
  }
}