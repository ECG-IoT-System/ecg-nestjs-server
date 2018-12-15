import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, Between, MoreThan } from 'typeorm';
import { Location } from './location.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOne(location): Promise<Location> {
    return await this.locationRepository.save(location);
  }
  async findLocationByUser(params): Promise<Location[]> {
    // find all
    if (!params.from && !params.limit && !params.to)
      return await this.locationRepository.find({user: {id: params.id}});

    const query: any = {
      where: { user: params.id },
      order: { timestamp: 'ASC' },
    };
    if (params.to) {
      query.where.timestamp = Between(params.from, params.to);
    }
    else {
      query.where.timestamp = MoreThan(params.from);
      query.take = params.limit || 2304;
    }

    return await this.locationRepository.find(query);
  }
}