import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from '../macs/mac.entity';
import { Rssi } from './entities/rssi.entity';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,

    @InjectRepository(Gsensor)
    private readonly gsensorRepository: Repository<Gsensor>,

    @InjectRepository(Rssi)
    private readonly rssiRepository: Repository<Rssi>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createEcgdata(params): Promise<Ecgdata[]> {
    return await this.ecgdataRepository.save(params);
  }

  async createGensors(params): Promise<Gsensor[]> {
    return await this.gsensorRepository.save(params);
  }

  async createRssi(param): Promise<Rssi> {
    return await this.rssiRepository.save(param);
  }

  async findMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ where: { mac }, relations: ["user"] });
  }
}