import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Ecgdata } from '../gateways/entities/ecgdata.entity';
import { Mac } from '../macs/mac.entity';
import { Between, MoreThan } from 'typeorm';

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

  // async findEcgdataByUser(query): Promise<Ecgdata[]> {
  //   query.order = { timestamp: 'ASC' };
  //   return await this.ecgdataRepository.find(query);
  // }
  async findEcgdataByUser(id,from,to): Promise<Ecgdata[]> {
    return await this.ecgdataRepository.find({
      where:{
        timestamp:Between(from,to),
        user:id,
      },
      order : { timestamp: 'ASC' },
    });  
  }
  async findEcgdataByUser_limit(id,from,limit): Promise<Ecgdata[]> {
      return await this.ecgdataRepository.find({
    where:{
      timestamp:MoreThan(from),
      user:id,
    },
    order : { timestamp: 'ASC' },
    take : limit,
  });    
  }
}