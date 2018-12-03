import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Ecgdata } from './entities/ecgdata.entity';
import { Rssi } from './entities/rssi.entity';
import { Mac } from 'src/macs/mac.entity';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,
    
    @InjectRepository(Rssi)
    private readonly rssiRepository: Repository<Rssi>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createSignals(Ecgdata): Promise<Ecgdata> {
    return await this.ecgdataRepository.save(Ecgdata);
  }

  async createRssi(Rssi): Promise<Rssi> {
    return await this.rssiRepository.save(Rssi);
  }

  async getMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ mac });
  }
}