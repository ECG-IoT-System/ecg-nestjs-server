import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Coef } from 'src/coefs/coef.entity';

@Injectable()
export class CoefService {
  constructor(
    @InjectRepository(Coef)
    private readonly coefRepository: Repository<Coef>,
  ) {}

  async createOne(coef): Promise<Coef> {
    return await this.coefRepository.save(coef);
  }
  async findAll(): Promise<Coef[]> {
    return await this.coefRepository.find();
  }

}