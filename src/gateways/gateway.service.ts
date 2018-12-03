import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Ecgdata } from './entities/ecgdata.entity';
import { Gsensor } from './entities/gsensor.entity';
import { Mac } from 'src/macs/mac.entity';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,
    
    @InjectRepository(Gsensor)
    private readonly GsensorRepository: Repository<Gsensor>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createSignals(Ecgdata): Promise<Ecgdata> {
    return await this.ecgdataRepository.save(Ecgdata);
  }

  async createGensors(Gsensor): Promise<Gsensor> {
    return await this.GsensorRepository.save(Gsensor);
  }

  async getMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ mac });
  }
}