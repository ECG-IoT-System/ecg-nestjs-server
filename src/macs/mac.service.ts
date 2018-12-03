import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Mac } from 'src/macs/mac.entity';

@Injectable()
export class MacService {
  constructor(
    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) {}

  async createOne(mac): Promise<Mac> {
    return await this.macRepository.save(mac);
  }
}