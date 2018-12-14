import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Mac } from '../macs/mac.entity';
import { User } from '../users/user.entity'

@Injectable()
export class MacService {
  constructor(
    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOne(mac): Promise<Mac> {
    return await this.macRepository.save(mac);
  }

  async createMac(params): Promise<Mac> {
    await this.macRepository.update({mac:params.mac, status: true},{status:false});
    return await this.macRepository.save(params);
  }

  async findMacByUserId(id): Promise<Mac[]> {
    return await this.macRepository.find({ user:{id} });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['macs'] });
  }

  async findMac(mac: string): Promise<Mac> {
    return await this.macRepository.findOne({ where: { mac, status:true }, relations: ['user'] });
  }

  async updateMaclasttime(where, query): Promise<UpdateResult> {
    return await this.macRepository.update( where , query );
  }
}