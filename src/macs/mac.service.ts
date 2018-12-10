import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mac } from '../macs/mac.entity';

@Injectable()
export class MacService {
  constructor(
    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createOne(mac): Promise<Mac> {
    return await this.macRepository.save(mac);
  }

  async createMac(params): Promise<Mac> {
    await this.macRepository.update({mac:params.mac, status: true},{status:false});
    return await this.macRepository.save(params);
  }

  async findMacByUserId(id): Promise<Mac[]> {
    return await this.macRepository.find({ user: id });
  }
}