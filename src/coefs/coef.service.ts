import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Coef } from './coef.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CoefService {
  constructor(
    @InjectRepository(Coef)
    private readonly coefRepository: Repository<Coef>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOne(coef): Promise<Coef> {
    return await this.coefRepository.save(coef);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ["coefs"] });
  }

  async findbyUserId(user,version): Promise<Coef[]> {
    return await this.coefRepository.find({ user,version })
  }
}