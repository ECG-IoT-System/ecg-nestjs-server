import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Pad } from './entities/pad.entity';
import { Rssi } from './entities/rssi.entity';
import { Mac } from 'src/macs/mac.entity';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Pad)
    private readonly padRepository: Repository<Pad>,
    
    @InjectRepository(Rssi)
    private readonly rssiRepository: Repository<Rssi>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createSignals(Pad): Promise<Pad> {
    return await this.padRepository.save(Pad);
  }

  async createRssi(Rssi): Promise<Rssi> {
    return await this.rssiRepository.save(Rssi);
  }

  async getMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ mac });
  }
}