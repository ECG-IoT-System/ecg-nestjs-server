import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Mac } from '../macs/mac.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

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
    const Isuser = await this.userRepository.findOne({ username: user.username });
    if (!Isuser) {
      return await this.userRepository.save(user);
    }
  }

  async updateLasttime(param) {
    // console.log('updatelasttime:' + param.lasttime);

    const user = await this.userRepository.findOne({ id: param.id });
    const query: any = {};

    if (param.lasttime && param.lasttime > user.lasttime) {
      // return minimum mac lasttime
      const macs = await this.macRepository.find({ user: { id: param.id } });
      let minlasttime = 0;

      macs.forEach(mac => {
        if (mac.lasttime > minlasttime)
          minlasttime = mac.lasttime;
      });
      // console.log('mac:' + macs);

      if (minlasttime >= user.lasttime) {
        query.lasttime = minlasttime;
      }
    }

    else if (param.lasttime_12L && param.lasttime_12L > user.lasttime_12L) {
      query.lasttime_12L = param.lasttime_12L; 
    }

    else if (param.lasttime_afstat && param.lasttime_afstat > user.lasttime_afstat) {
      query.lasttime_afstat = param.lasttime_afstat;
    }

    if (Object.keys(query).length === 0) return;

    return await this.userRepository.update({ id: param.id }, query)

  }

}