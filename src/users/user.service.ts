import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Ecgdata } from 'src/gateways/entities/ecgdata.entity';
import { MacParams } from 'src/macs/view-models/mac-params.model';
import { Mac } from 'src/macs/mac.entity';
import { relative } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ecgdata)
    private readonly ecgdataRepository: Repository<Ecgdata>,

    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.userRepository.find({ username });
  }

  async createOne(user): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findEcgdataByUser(query): Promise<Ecgdata[]> {
    query.order = { timestamp: "ASC" }
    return await this.ecgdataRepository.find(query);
  }

  async findEcgdata12ByUser(user): Promise<User> {
    return await this.userRepository.save(user);
  }
}