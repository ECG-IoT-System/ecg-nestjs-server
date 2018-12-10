import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Between, MoreThan } from 'typeorm';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from './entities/rssi.entity';

@Injectable()
export class EcgdataService {
  constructor(
    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,

    @InjectRepository(Gsensor)
    private readonly gsensorRepository: Repository<Gsensor>,

    @InjectRepository(Rssi)
    private readonly rssiRepository: Repository<Rssi>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) { }

  async createEcgdata(params): Promise<Ecgdata[]> {
    return await this.ecgdataRepository.save(params);
  }

  async createGensors(params): Promise<Gsensor[]> {
    return await this.gsensorRepository.save(params);
  }

  async createRssi(param): Promise<Rssi> {
    console.log(param);
    return await this.rssiRepository.save(param);
  }

  async findMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ where: { mac }, relations: ['user'] });
  }

  async findEcgdataByUser(params): Promise<Ecgdata[]> {
    if(!params.from && !params.limit && !params.to)
      return await this.ecgdataRepository.find({user:params.id});
    const query: any = {
      where: { user: params.id },
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

  async findGsensorByUser(params): Promise<Gsensor[]> {
    if(!params.from && !params.limit && !params.to)
      return await this.gsensorRepository.find({user:params.id});
    const query: any = {
      where: { user: params.id },
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


  async updateAfstatByUser(params) {
    const query: any = {
      user: params.id,
      timestamp: Between(params.from, params.to)
    };
    let istrue = (params.afstat === 'true' || params.afstat === '1');
    return await this.ecgdataRepository.update(query, { afstat: istrue });
  }

}